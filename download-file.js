document.getElementsByClassName('accordion-body')[0].innerHTML = ` 
<p class="output" style="color: #7d82c0; font-size: 22px;font-weight: 600; ">Класирани са ${localStorage.getItem('acceptedStudents')} кандидат-студенти.</p>
                        <p class="output" style="color: #7d82c0; font-size: 20px; ">Намерени и обработени са <b>${localStorage.getItem('student-file')}</b> реда от файла с <br><b>кандидат-студентите</b>.</p>
                        <p class="output" style="color: #7d82c0; font-size: 20px; ">Намерени и обработени са <b>${localStorage.getItem('university-file')}</b> реда от файла с <br><b>Висшите училища</b>.</p>
                       
`
document.getElementById('file-upload-btn').addEventListener('click', downloadFile)

function downloadFile(e){
    const link = document.createElement("a");
    const file = new Blob([ new Uint8Array([0xEF, 0xBB, 0xBF]),localStorage.getItem('ranked')], { type: 'text/csv;charset=utf-8' });
    console.log(file);
    link.href = URL.createObjectURL(file);
    link.download = "result.csv";
    link.click();
    URL.revokeObjectURL(link.href);
         
}