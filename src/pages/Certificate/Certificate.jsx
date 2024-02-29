import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = () => {
  const [userData] = useState({
    username: 'John Doe',
    courseName: 'Piano',
    completionDate: 'November 3, 2023',
  });

  const handleDownloadCertificate = () => {
    const certificateElement = document.querySelector('.certificate');
    const { offsetWidth, offsetHeight } = certificateElement;

    // Calculate the PDF dimensions based on the content size
    const pdfWidth = offsetWidth;
    const pdfHeight = offsetHeight;

    html2canvas(certificateElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      pdf.save('certificate.pdf');
    });
  };

  return (
    <div className="certificate p-8 bg-white rounded-lg shadow-lg text-center" style={{ height: '700px' }}>
    <h2 className="text-4xl font-semibold  text-blue-500 mt-5">Master's of Music</h2>
      <h2 className="text-2xl font-semibold text-dark mt-5">Certificate of Completion</h2>
      <p className="text-lg text-dark mt-3" >This is to certify that</p>
      <h2 className="text-2xl font-semibold text-dark mt-3">{userData.username}</h2>
      <p className="text-lg text-dark"mt-5> with the legal name of John Doe, has demonstrated exemplary commitment and proficiency. After completing the rigorous requirements, he has successfully and satisfactorily finished the prescribed course, showcasing commendable dedication and achieving a high level of understanding in the Music Mastery .</p>
      <h2 className="text-2xl font-semibold text-dark mt-3">Music Mastery Completion Certificate</h2>
      <p className="text-lg text-dark mt-3">on this day</p>
      <h2 className="text-2xl font-semibold text-dark mt-3">{userData.completionDate}</h2>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-5"
        style={{ width: '200px', height: '40px' }}
        onClick={handleDownloadCertificate}
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;



