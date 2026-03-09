import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { RFO, RFOStatus } from './rfo.entity';
import * as puppeteer from 'puppeteer';

@Injectable()
export class RFOService {
  constructor(
    @InjectRepository(RFO)
    private rfoRepository: Repository<RFO>,
  ) { }

  private generateRFONumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    return `RFO${timestamp}`;
  }

  async findAll(search?: string) {
    if (search) {
      return this.rfoRepository.find({
        where: [
          { clientName: Like(`%${search}%`) },
          { rfoNumber: Like(`%${search}%`) },
          { cidIw: Like(`%${search}%`) },
        ],
        order: { createdAt: 'DESC' },
      });
    }
    return this.rfoRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string) {
    const rfo = await this.rfoRepository.findOne({ where: { id } });
    if (!rfo) throw new NotFoundException('RFO not found');
    return rfo;
  }

  async create(dto: Partial<RFO>, userId: string, userName: string) {
    const rfo = this.rfoRepository.create({
      ...dto,
      rfoNumber: this.generateRFONumber(),
      createdById: userId,
      createdByName: userName,
      status: RFOStatus.PENDING,
    });
    return this.rfoRepository.save(rfo);
  }

  async update(id: string, dto: Partial<RFO>) {
    const rfo = await this.findById(id);
    if (rfo.status === RFOStatus.APPROVED) {
      throw new ForbiddenException('Cannot edit an approved RFO');
    }
    await this.rfoRepository.update(id, dto);
    return this.findById(id);
  }

  async approve(id: string, userId: string) {
    const rfo = await this.findById(id);
    await this.rfoRepository.update(id, {
      status: RFOStatus.APPROVED,
      approvedById: userId,
      approvedAt: new Date(),
    });
    return this.findById(id);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.rfoRepository.delete(id);
    return { message: 'RFO deleted' };
  }

  async generatePDF(id: string): Promise<Buffer> {
    const rfo = await this.findById(id);
    const html = this.buildPDFHtml(rfo);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
      printBackground: true,
    });
    await browser.close();
    return Buffer.from(pdf);
  }

  private buildPDFHtml(rfo: RFO): string {
    // Fallback for nulls
    const safe = (val: any) => val || '-';

    return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <style>
    @page { margin: 0; }
    * { box-sizing: border-box; }
    body { 
        font-family: "Times New Roman", Times, serif; 
        font-size: 11px; 
        color: #000; 
        margin: 0; 
        padding: 0; 
        position: relative;
        min-height: 100vh;
    }
    
    /* Document header/footer color bars */
    .top-bar { height: 18px; width: 100%; display: flex; }
    .bottom-bar { height: 18px; width: 100%; display: flex; position: absolute; bottom: 0; left: 0;}
    .color-1 { flex: 1; background-color: #7b439c; } /* Purple */
    .color-2 { flex: 1; background-color: #b0539c; } /* Pink */
    .color-3 { flex: 1; background-color: #8854a0; }
    .color-4 { flex: 1; background-color: #be4b9d; }

    .logo-container { padding: 10px 40px 10px; }
    .logo-container img { height: 50px; }
    .logo-text { font-family: Arial, sans-serif; font-size: 10px; margin-top: 2px; }

    .content-wrapper { padding: 0 40px 60px; }

    table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    th, td { border: 1px solid #000; padding: 4px 6px; vertical-align: middle; }
    
    /* Double border effect for specific tables */
    .double-border { border: 2px double #000; }
    .double-border th, .double-border td { border: 1px solid #000; }

    /* Headers / Titles */
    .section-title { font-weight: bold; text-align: center; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rVrf2wDEyMQMwgwAAgwADEwA26Ssm4oAAAAAElFTkSuQmCC') repeat; margin-bottom: 4px; padding: 2px 0; }
    .section-title span { background: #fff; padding: 0 5px; } /* White background for text on top of dots */
    
    .label-col { width: 25%; font-weight: bold; }
    .value-col { width: 75%; }

    .dotted-bg { background: url('data:image/png;base64,iVBORw0goAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rVrf2wDEyMQMwgwAAgwADEwA26Ssm4oAAAAAElFTSuQmCC') repeat; padding: 10px; border: 1px dotted #000; margin-bottom: 15px;}
    .dotted-bg > div { background: #fff;  } /* make text readable */
    
    .rich-text {
        font-family: inherit;
        border: 1px dotted #000;
        padding: 8px;
        min-height: 40px;
        margin-bottom: 15px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==') repeat;
    }
    .rich-text-content {
        background-color: white; /* to make text readable over dotted bg */
        padding: 4px;
    }
    .rich-text-content img { max-width: 100%; height: auto; display: block; margin: 4px 0; }
    .rich-text-content ul, .rich-text-content ol { padding-left: 20px; margin: 4px 0; }
    .rich-text-content p { margin: 4px 0; }

    /* Signature table */
    .sig-table { width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #000; }
    .sig-table th { font-weight: normal; text-align: center; border: 1px solid #000; padding: 4px; border-bottom: 2px solid #000;}
    .sig-table td { width: 50%; height: 120px; border: 1px solid #000; text-align: center; vertical-align: bottom; padding-bottom: 10px; position: relative;}
    .sig-name { font-weight: bold; }

    .footer-address {
        position: absolute;
        bottom: 30px;
        width: 100%;
        text-align: center;
        font-family: Arial, sans-serif;
        font-size: 8px;
        color: #666;
        line-height: 1.4;
    }
  </style>
</head>
<body>
  <!-- Top decorative bar -->
  <div class="top-bar">
    <div class="color-1"></div><div class="color-2"></div>
    <div class="color-3"></div><div class="color-4"></div>
  </div>

  <!-- Logo (Using placeholder text if logo not injected yet, but user will provide later) -->
  <div class="logo-container">
    <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #b0539c, #7b439c); color: white; display: flex; align-items: center; justify-content: center; font-family: Arial; font-weight: bold; font-size: 24px; float: left; margin-right: 8px;">iW</div>
    <div style="padding-top: 6px;">
        <div style="font-family: Arial; font-size: 14px; letter-spacing: -0.5px; color: #333;">internet<span style="font-weight: bold;">Work</span></div>
    </div>
    <div style="clear: both;"></div>
  </div>

  <div class="content-wrapper">
    
    <div class="section-title"><span>Incident Report</span></div>
    <table class="double-border">
      <tr>
        <td class="label-col">Customer Name</td>
        <td class="value-col">${safe(rfo.clientName)}</td>
      </tr>
      <tr>
        <td class="label-col">Project Name</td>
        <td class="value-col">MASS GROUP</td>
      </tr>
      <tr>
        <td class="label-col">Location</td>
        <td class="value-col">Palembang</td>
      </tr>
    </table>

    <table class="double-border" style="margin-top: 15px;">
      <tr>
        <th colspan="4" style="text-align: center; border-bottom: 2px solid #000; padding: 6px;">DETAILED INCIDENT INFORMATIOIN</th>
      </tr>
      <tr>
        <td class="label-col" style="width: 25%;">Incident Date</td>
        <td style="width: 25%; text-align: center;">${safe(rfo.incidentDate)}</td>
        <td class="label-col" style="width: 25%;">Incident Hour</td>
        <td style="width: 25%; text-align: center;">${safe(rfo.incidentHour)}</td>
      </tr>
      <tr>
        <td class="label-col">Incident Number</td>
        <td style="text-align: center;">${safe(rfo.rfoNumber)}</td>
        <td class="label-col">Incident Category</td>
        <td style="text-align: center;">${safe(rfo.category)}</td>
      </tr>
      <tr>
        <td class="label-col">Was the SLA Breached ?</td>
        <td style="text-align: center;">${rfo.impactedSla ? 'Yes' : 'No'}</td>
        <td class="label-col">Duration of Interruption</td>
        <td style="text-align: center;">${rfo.durationMinutes} minute</td>
      </tr>
      <tr>
        <td class="label-col">Number Ticket</td>
        <td style="text-align: center;">InternetWork#213563</td>
        <td class="label-col">Status Ticket</td>
        <td style="text-align: center;">${safe(rfo.statusTicket)}</td>
      </tr>
    </table>

    <div class="section-title" style="margin-top: 20px;"><span>Incident Description</span></div>
    <div class="rich-text">
        <div class="rich-text-content">${safe(rfo.incidentDescription)}</div>
    </div>

    <!-- Business Impact was in screenshot but not in our form schema, using a placeholder or rootCause -->
    <div class="section-title"><span>Business Impact</span></div>
    <div class="rich-text">
        <div class="rich-text-content">Main Link Down site Wahana Bara Sentosa</div>
    </div>

    <div class="section-title"><span>Corrective Action Taken</span></div>
    <div class="rich-text">
        <div class="rich-text-content">
            <p><strong>Root Cause :</strong></p>
            <div>${safe(rfo.rootCause)}</div>
            <p style="margin-top: 10px;"><strong>Action :</strong></p>
            <div>${safe(rfo.actionTaken)}</div>
        </div>
    </div>

    <table class="sig-table">
        <tr>
            <th>Reported by</th>
            <th>Acknowledge by</th>
        </tr>
        <tr>
            <td>
                <div style="margin-bottom: 40px; color: #b0539c; font-size: 24px; font-family: 'Brush Script MT', cursive; opacity: 0.8; transform: rotate(-10deg);">
                    internetWork
                </div>
                <div class="sig-name">Tanto</div>
                <div>Techsup2</div>
                <div style="font-weight: bold;">Internetwork Komunikasi Indonesia</div>
            </td>
            <td>
                <div style="font-weight: bold;">PT Mass Group</div>
            </td>
        </tr>
    </table>
  </div>

  <div class="footer-address">
    Neo Soho Capital Lt.35 Unit 3509 Podomoro City, Central Park<br>
    Jl. Letjen S. Parman Kav. 28, Jakarta Barat 11460, Indonesia
  </div>

  <!-- Bottom decorative bar -->
  <div class="bottom-bar">
    <div class="color-1"></div><div class="color-2"></div>
    <div class="color-3"></div><div class="color-4"></div>
  </div>
</body>
</html>
        `;
  }
}
