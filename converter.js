
import * as XLSX from "./node_modules/xlsx/xlsx.mjs";

document.getElementById("file-upload").addEventListener("change", converter);
document.getElementById("min-score").addEventListener("click", selectMinScore)
localStorage.clear()
//min score filter
let minfilterScore = 9


function selectMinScore(e){

  console.log(e.target);
let current_score = Number(document.getElementById("score").value) 
  if (!current_score){
    
    document.getElementById('filter-error').textContent = 'Моля, въведете число'
    
  }
  else if(typeof current_score === "number"){
    minfilterScore = current_score
    console.log(minfilterScore);
    document.getElementById('filter-error').textContent = ''

  }
}

//converter
let result = {};
async function converter(e) {
  



  if (e.target.files.length > 1){
    document.getElementById('error').textContent = 'Моля, изберете само един файл.'

  }else{
  for (let file of e.target.files) {
    if (file.name.includes(".xls")) {
      let convertedJSON;

      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      await new Promise((resolve) => (fileReader.onload = () => resolve()));

      let binaryData = fileReader.result;
      let workbook = XLSX.read(binaryData, { type: "binary" });

      workbook.SheetNames.forEach((sheet) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

        convertedJSON = JSON.stringify(data, undefined, 4);
      });
      console.log(convertedJSON);
      

      if (JSON.parse(convertedJSON)[0].UIN && document.getElementById('file-title').textContent == 'Моля, изберете файла с кандидат-студентите') {
        let exampleJSON = JSON.parse(convertedJSON)[0]
        if (exampleJSON.UIN && exampleJSON.firstScore 
          && exampleJSON.course_id1&& exampleJSON.secondScore
          && exampleJSON.course_id2&& exampleJSON.thirdScore
          && exampleJSON.course_id3&& exampleJSON.forthScore
          && exampleJSON.course_id4&& exampleJSON.fifthScore
          && exampleJSON.course_id5){

            localStorage.setItem('student-file',JSON.parse(convertedJSON).length)
            result["studentsData"] = JSON.parse(convertedJSON);
            console.log(result);
            document.getElementById('file-title').textContent = 'Моля, изберете файла с Висшите училища'
            document.getElementById('error').textContent = ''
          }else {
            document.getElementById('error').textContent = 'Невалидно наименувани колони във файла.'
          }
        //localStorage.setItem('studentsData',convertedJSON)
        //setData('studentsData',convertedJSON)
      }
      
      else if (JSON.parse(convertedJSON)[0].speciality && document.getElementById('file-title').textContent == 'Моля, изберете файла с Висшите училища') {
        
        let exampleJSON = JSON.parse(convertedJSON)[0]
        if (exampleJSON.speciality && exampleJSON.free_places 
          && exampleJSON.university&& exampleJSON.course_id
          && exampleJSON.university_id){
            let uniData = [];
        for (let uni of JSON.parse(convertedJSON)) {
          uni.accepted = [];
          uniData.push(uni);
          document.getElementById('error').textContent = ''

        }
        result["uniData"] = uniData;
        localStorage.setItem('university-file',uniData.length)

          }else{
        document.getElementById('error').textContent = 'Невалидно наименувани колони във файла.'

          }

        console.log(result);
      }else{
        document.getElementById('error').textContent = 'Невалидно наименувани колони във файла.'
      }
      
    }
    if (file.name.includes(".json")) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      await new Promise((resolve) => (fileReader.onload = () => resolve()));

      let binaryData = fileReader.result;
     
      binaryData = JSON.parse(binaryData)
      if (binaryData[0].UIN && document.getElementById('file-title').textContent == 'Моля, изберете файла с кандидат-студентите') {
        let exampleJSON = binaryData[0]
        if (exampleJSON.UIN && exampleJSON.firstScore 
          && exampleJSON.course_id1&& exampleJSON.secondScore
          && exampleJSON.course_id2&& exampleJSON.thirdScore
          && exampleJSON.course_id3&& exampleJSON.forthScore
          && exampleJSON.course_id4&& exampleJSON.fifthScore
          && exampleJSON.course_id5){
        localStorage.setItem("student-file", binaryData.length);

        result["studentsData"] = binaryData;
        document.getElementById('file-title').textContent = 'Моля, изберете файла с Висшите училища'
        document.getElementById('error').textContent = ''
        }else {
        document.getElementById('error').textContent = 'Невалидно наименувани колони във файла.'
      }
    }
      else if (binaryData[0].speciality && document.getElementById('file-title').textContent == 'Моля, изберете файла с Висшите училища') {
       let exampleJSON = binaryData[0]
        if (exampleJSON.speciality && exampleJSON.free_places 
          && exampleJSON.university&& exampleJSON.course_id
          && exampleJSON.university_id){
        let uniData = [];
        for (let uni of binaryData) {
          uni.accepted = [];
          uniData.push(uni);
        }
        document.getElementById('error').textContent = ''
        localStorage.setItem("university-file", uniData.length);

        result["uniData"] = uniData;
      }
      else{
      document.getElementById('error').textContent = 'Невалидно наименувани колони във файла.'

        }
    }else{
        document.getElementById('error').textContent = 'Невалидно наименувани колони във файла.'

          }
      
          
        }
      }
      if (result.studentsData && result.uniData){
        algorithm(result)
        result = {}
      }
}
  function algorithm(result){

  
  console.log(result);
  let studentsData = result.studentsData
  let universitiesData = result.uniData
  
  //algorithm
  for (let student of studentsData) {
 
 
 
    addStudent(student);
 
}
 
//console.log(universitiesData.forEach(e=>e.course_id=='1426'?console.log(e.accepted):''));
function addStudent(student) {
  let filter = [];
  universitiesData.forEach((e) =>
    e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
  );
 
  let second_university = null;
  let third_university = null;
  let forth_university = null;
  let fifth_university = null;
  let first_university = null
  if(student.firstScore >= minfilterScore && !filter.includes(true)){

    first_university = universitiesData.find(
      (e) => e.course_id == student.course_id1
    );
    sortCandidatesUniversity(first_university,student.firstScore)
  }
  if (
    student.secondScore &&
    student.secondScore >= minfilterScore &&
    !filter.includes(true)
  ) {
    second_university = universitiesData.find(
      (e) => e.course_id == student.course_id2
    );
  sortCandidatesUniversity(second_university,student.secondScore)
 
  }
  if (
    student.thirdScore &&
    student.thirdScore >= minfilterScore &&
    !filter.includes(true)
  ) {
    third_university = universitiesData.find(
      (e) => e.course_id == student.course_id3
    );
  sortCandidatesUniversity(third_university,student.thirdScore)
 
  }
  if (
    student.forthScore &&
    student.forthScore >= minfilterScore &&
    !filter.includes(true)
  ) {
    forth_university = universitiesData.find(
      (e) => e.course_id == student.course_id4
    );
  sortCandidatesUniversity(forth_university,student.forthScore)
 
  }
  if (
    student.fifthScore &&
    student.fifthScore >= minfilterScore &&
    !filter.includes(true)
  ) {
    fifth_university = universitiesData.find(
      (e) => e.course_id == student.course_id5
    );
  sortCandidatesUniversity(fifth_university,student.fifthScore)
 
  }
 
 
 
  function sortCandidatesUniversity(university, studentScore) {
    let filter = [];
    universitiesData.forEach((e) =>
      e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
    );
    if (
      university.free_places > 0 &&
      studentScore >= 9 &&
      !filter.includes(true)
    ) {
      university.free_places -= 1;
 
      university.accepted.push({
        UIN: student.UIN,
        score: studentScore,
      });
      return;
    }
    filter = [];
    universitiesData.forEach((e) =>
      e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
    );
    if (university.free_places == 0 && !filter.includes(true)) {
      let scores = [];
      university.accepted.forEach((el) => scores.push(el.score));
      scores.sort((a, b) => b - a);
      let minScore = scores.pop();
 
      if (minScore < studentScore) {
        let sts = [];
        let removal_counter = 0;
        let countRemove = university.accepted.filter(
          (s) => s.score == minScore
        );
        console.log(countRemove.length == 1);
        for (const line of countRemove) {
          let indexRemove = university.accepted.indexOf(line);
          //console.log(indexRemove);
          let st = studentsData.find((e) => e.UIN == line.UIN);
          university.accepted.splice(indexRemove, 1);
          sts.push(st);
        }
 
        university.accepted.push({
          UIN: student.UIN,
          score: studentScore,
        });
        for (const st of sts) {
          addStudent(st);
        }
      }
 
      filter = [];
      universitiesData.forEach((e) =>
        e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
      );
 
      if (studentScore == minScore && !filter.includes(true)) {
        university.accepted.push({
          UIN: student.UIN,
          score: studentScore,
        });
      }
    }
  }

  }
  let acceptedStudents = 0;
  let ranked=""
  ranked+=
    "course_id, speciality, university, university_id, announced_places, free_places, UIN\n";
  //appendFileSync("result.csv", firstRow);
  universitiesData.forEach((uni) =>
    uni.accepted.sort((a, b) => b.score - a.score)
  );
  universitiesData.forEach((uni) =>
    uni.accepted.forEach(st =>{
      acceptedStudents+=1
      ranked+=
      
        `${uni.course_id}, ${uni.speciality}, ${uni.university}, ${
          uni.university_id
        }, ${uni.free_places + uni.accepted.length}, ${uni.free_places}, ${
          st.UIN
        }, ${st.score}\n`
    }
    )
  );
  localStorage.setItem('acceptedStudents', acceptedStudents)
  localStorage.setItem('ranked', ranked)
  console.log(ranked);

  universitiesData.forEach((uni) => console.log(uni));
  const link = document.createElement("a");
    
         const file = new Blob([ new Uint8Array([0xEF, 0xBB, 0xBF]),ranked], { type: 'text/csv;charset=utf-8' });
        localStorage.setItem('downloadFile',file)
        link.href = '/download-file.html'
        link.click()
       /*  link.href = URL.createObjectURL(file);
         console.log(file);
         link.download = "result.csv";
         link.click();
         URL.revokeObjectURL(link.href);*/
         
}
}
