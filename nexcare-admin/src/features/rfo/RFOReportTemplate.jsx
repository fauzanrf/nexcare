import React, { forwardRef } from 'react';

export const RFOReportTemplate = forwardRef(({ rfo }, ref) => {
  if (!rfo) return null;

  return (
    <div ref={ref} style={{ 
      backgroundColor: 'white', 
      padding: '32px', 
      width: '210mm', 
      minHeight: '297mm', 
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      color: 'black'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '24px', 
        borderBottom: '4px solid #9333ea', 
        paddingBottom: '8px' 
      }}>
        <div style={{ width: '120px' }}>
           <div style={{ 
             backgroundColor: '#9333ea', 
             color: 'white', 
             padding: '12px', 
             textAlign: 'center',
             fontWeight: 'bold',
             fontSize: '16px'
           }}>
             InternetWork
           </div>
        </div>
        <div style={{ textAlign: 'right' }}>
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#1f2937', 
              textTransform: 'uppercase', 
              letterSpacing: '2px',
              margin: '0 0 4px 0'
            }}>Reason For Outage</h1>
            <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>Document Ref: {rfo.id}</p>
        </div>
      </div>

      {/* Incident Report Table */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          backgroundColor: '#e5e7eb', 
          textAlign: 'center', 
          fontWeight: 'bold', 
          padding: '4px', 
          border: '1px solid black', 
          borderBottom: 'none' 
        }}>Incident Report</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', fontSize: '11px' }}>
            <tbody>
                <tr>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', width: '25%', backgroundColor: '#f9fafb' }}>Customer Name</td>
                    <td style={{ border: '1px solid black', padding: '4px', width: '75%' }}>{rfo.clientName}</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Project Name</td>
                    <td style={{ border: '1px solid black', padding: '4px' }}>{rfo.projectName || '-'}</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Location</td>
                    <td style={{ border: '1px solid black', padding: '4px' }}>{rfo.location}</td>
                </tr>
            </tbody>
        </table>
      </div>

      {/* Detailed Info Table */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          backgroundColor: '#e5e7eb', 
          textAlign: 'center', 
          fontWeight: 'bold', 
          padding: '4px', 
          border: '1px solid black', 
          borderBottom: 'none' 
        }}>DETAILED INCIDENT INFORMATION</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', fontSize: '11px' }}>
            <tbody>
                <tr>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', width: '15%', backgroundColor: '#f9fafb' }}>Incident Date</td>
                    <td style={{ border: '1px solid black', padding: '4px', width: '35%' }}>{rfo.incidentDate}</td>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', width: '15%', backgroundColor: '#f9fafb' }}>Incident Hour</td>
                    <td style={{ border: '1px solid black', padding: '4px', width: '35%' }}>{rfo.incidentHour}</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Incident Number</td>
                    <td style={{ border: '1px solid black', padding: '4px' }}>{rfo.id}</td>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Incident Category</td>
                    <td style={{ border: '1px solid black', padding: '4px', textTransform: 'uppercase' }}>{rfo.incidentCategory}</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Was SLA Breached?</td>
                    <td style={{ border: '1px solid black', padding: '4px' }}>{parseFloat(rfo.sla) < 99 ? 'YES' : 'NO'}</td>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Duration</td>
                    <td style={{ border: '1px solid black', padding: '4px' }}>{rfo.durationInterruption}</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Number Ticket</td>
                    <td style={{ border: '1px solid black', padding: '4px' }}>{rfo.ticketNumber}</td>
                    <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Status Ticket</td>
                    <td style={{ border: '1px solid black', padding: '4px', textTransform: 'uppercase' }}>{rfo.statusTicket}</td>
                </tr>
            </tbody>
        </table>
      </div>

      {/* Incident Description */}
      <div style={{ marginBottom: '24px' }}>
         <div style={{ backgroundColor: '#e5e7eb', textAlign: 'center', fontWeight: 'bold', padding: '4px', marginBottom: '8px' }}>Incident Description</div>
         <div style={{ padding: '16px', border: '1px solid #e5e7eb', minHeight: '60px', fontSize: '11px' }}>
            {rfo.incidentDescription}
         </div>
      </div>

      {/* Business Impact */}
      <div style={{ marginBottom: '24px' }}>
         <div style={{ backgroundColor: '#e5e7eb', textAlign: 'center', fontWeight: 'bold', padding: '4px', marginBottom: '8px' }}>Business Impact</div>
         <div style={{ padding: '16px', border: '1px solid #e5e7eb', minHeight: '100px', fontSize: '11px' }}>
            <p style={{ marginBottom: '16px' }}>{rfo.businessImpact}</p>
            {/* Packet Loss Graph Placeholder */}
            <div style={{ 
              width: '100%', 
              height: '160px', 
              backgroundColor: '#1f2937', 
              borderRadius: '4px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#9ca3af', 
              fontFamily: 'monospace', 
              fontSize: '10px', 
              border: '1px solid #374151',
              textAlign: 'center',
              padding: '8px'
            }}>
                [PACKET LOSS GRAPH PLACEHOLDER]<br/>
                No specific graph data available
            </div>
         </div>
      </div>

      {/* Corrective Action */}
      <div style={{ marginBottom: '32px' }}>
         <div style={{ backgroundColor: '#e5e7eb', textAlign: 'center', fontWeight: 'bold', padding: '4px', marginBottom: '8px' }}>Corrective Action Taken</div>
         <div style={{ padding: '16px', border: '1px solid #e5e7eb', fontSize: '11px' }}>
            <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 'bold' }}>Rootcause :</span> {rfo.rootCause}</p>
            <p style={{ marginBottom: '12px' }}><span style={{ fontWeight: 'bold' }}>Action :</span> {rfo.action}</p>
            <p><span style={{ fontWeight: 'bold' }}>Status :</span> {rfo.status === 'Accept' || rfo.status === 'Completed' ? 'Link termonitor UP dan Normal kembali' : rfo.status}</p>
         </div>
      </div>

      {/* Signatures */}
      <div style={{ marginTop: '48px', border: '1px solid black' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', fontSize: '11px' }}>
            <div style={{ borderRight: '1px solid black' }}>
                <div style={{ padding: '4px', borderBottom: '1px solid black', fontWeight: 'bold' }}>Reported by</div>
                <div style={{ height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ 
                      backgroundColor: '#9333ea', 
                      color: 'white', 
                      padding: '8px 16px', 
                      fontWeight: 'bold',
                      opacity: 0.5
                    }}>
                      InternetWork
                    </div>
                </div>
                <div style={{ padding: '8px', fontWeight: 'bold', borderTop: '1px solid black', textTransform: 'uppercase', fontSize: '10px' }}>
                    {rfo.createdBy || 'Admin Staff'}<br/>
                    <span style={{ fontWeight: 'normal', textTransform: 'capitalize' }}>Network Operation Center Support</span><br/>
                    <span style={{ fontWeight: 'bold' }}>InternetWork Komunikasi Indonesia</span>
                </div>
            </div>
            <div>
                <div style={{ padding: '4px', borderBottom: '1px solid black', fontWeight: 'bold' }}>Acknowledge by</div>
                <div style={{ height: '96px' }}></div>
                <div style={{ padding: '8px', fontWeight: 'bold', borderTop: '1px solid black', textTransform: 'uppercase' }}>
                     <br/>
                     <br/>
                    {rfo.clientName}
                </div>
            </div>
        </div>
      </div>

      {/* Footer Address */}
      <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '9px', color: '#6b7280' }}>
        Neo Soho Capital Lt.35 Unit 3509 Podomoro City, Central Park<br/>
        Jl. Letjen S. Parman Kav. 28, Jakarta Barat 11460, Indonesia
      </div>

    </div>
  );
});

RFOReportTemplate.displayName = 'RFOReportTemplate';
