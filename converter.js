
import * as XLSX from "./node_modules/xlsx/xlsx.mjs";

document.getElementById("file-upload").addEventListener("change", converter);
document.getElementById("min-score").addEventListener("click", selectMinScore)
localStorage.clear()
//min score filter
let minScore = 9


function selectMinScore(e){

  console.log(e.target);
let current_score = Number(document.getElementById("score").value) 
  if (!current_score){
    
    document.getElementById('filter-error').textContent = 'Моля, въведете число'
    
  }
  else if(typeof current_score === "number"){
    minScore = current_score
    console.log(minScore);
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
      binaryData = JSON.parse(binaryData);
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
    let second_university = null;
    let third_university = null;
    let forth_university = null;
    let fifth_university = null;
    let first_university = universitiesData.find(
      (e) => e.course_id == student.course_id1
    );
  
    let filter = [];
    universitiesData.forEach((e) =>
      e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
    );
    if (
      first_university.free_places > 0 &&
      student.firstScore >= minScore &&
      !filter.includes(true)
    ) {
      first_university.free_places -= 1;
  
      first_university.accepted.push({
        UIN: student.UIN,
        score: student.firstScore,
      });
      return;
    }
    filter = [];
    universitiesData.forEach((e) =>
      e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
    );
    if (first_university.free_places == 0 && !filter.includes(true)) {
      let scores = [];
      first_university.accepted.forEach((el) => scores.push(el.score));
      scores.sort((a, b) => b - a);
      let minScore = scores.pop();
  
      if (minScore < student.firstScore) {
        let sts = [];
  
        for (const line of first_university.accepted) {
          if (line.score == minScore) {
            let indexRemove = first_university.accepted.indexOf(line);
            //console.log(indexRemove);
            let st = studentsData.find((e) => e.UIN == line.UIN);
            first_university.accepted.splice(indexRemove, 1);
            sts.push(st);
          }
        }
  
        first_university.accepted.push({
          UIN: student.UIN,
          score: student.firstScore,
        });
        for (const st of sts) {
          addStudent(st);
        }
      }
  
      filter = [];
      universitiesData.forEach((e) =>
        e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
      );
  
      if (student.firstScore == minScore && !filter.includes(true)) {
        first_university.accepted.push({
          UIN: student.UIN,
          score: student.firstScore,
        });
      }
    }
    filter = [];
    universitiesData.forEach((e) =>
      e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
    );
    if (
      student.secondScore &&
      student.secondScore >= minScore &&
      !filter.includes(true)
    ) {
      second_university = universitiesData.find(
        (e) => e.course_id == student.course_id2
      );
    }
    filter = [];
    universitiesData.forEach((e) =>
      e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
    );
    if (
      second_university &&
      second_university.free_places > 0 &&
      !filter.includes(true)
    ) {
      second_university.accepted.push({
        UIN: student.UIN,
        score: student.secondScore,
      });
      second_university.free_places -= 1;
      return;
    }
    filter = [];
    universitiesData.forEach((e) =>
      e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
    );
    if (second_university && second_university.free_places == 0) {
      let scores = [];
      second_university.accepted.forEach((el) => scores.push(el.score));
      scores.sort((a, b) => b - a);
      let minScore = scores.pop();
  
      if (minScore < student.secondScore) {
        let sts = [];
        for (const line of second_university.accepted) {
          if (line.score == minScore) {
            let indexRemove = second_university.accepted.indexOf(line);
            // console.log(indexRemove);
            let st = studentsData.find((e) => e.UIN == line.UIN);
            sts.push(st);
            second_university.accepted.splice(indexRemove, 1);
          }
        }
  
        second_university.accepted.push({
          UIN: student.UIN,
          score: student.secondScore,
        });
        for (const st of sts) {
          addStudent(st);
        }
      }
    }
    filter = [];
    universitiesData.forEach((e) =>
      e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
    );
    if (student.thirdScore && student.thirdScore >= minScore && !filter.includes(true)) {
      third_university = universitiesData.find(
        (e) => e.course_id == student.course_id3
      );
    }
    if (third_university && Number(third_university.free_places) > 0) {
      third_university.accepted.push({
        UIN: student.UIN,
        score: student.thirdScore,
      });
      third_university.free_places -= 1;
      return;
    }
    if (third_university && third_university.free_places == 0) {
      let scores = [];
      third_university.accepted.forEach((el) => scores.push(el.score));
      scores.sort((a, b) => b - a);
      let minScore = scores.pop();
  
      if (minScore < student.thirdScore) {
        let sts = [];
        for (const line of third_university.accepted) {
          if (line.score == minScore) {
            let indexRemove = third_university.accepted.indexOf(line);
            // console.log(indexRemove);
            let st = studentsData.find((e) => e.UIN == line.UIN);
            sts.push(st);
            third_university.accepted.splice(indexRemove, 1);
          }
        }
  
        third_university.accepted.push({
          UIN: student.UIN,
          score: student.thirdScore,
        });
        for (const st of sts) {
          addStudent(st);
        }
      }
    }
    filter = [];
    universitiesData.forEach((e) =>
      e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
    );
    if (student.forthScore && student.forthScore >= minScore && !filter.includes(true)) {
      forth_university = universitiesData.find(
        (e) => e.course_id == student.course_id4
      );
    }
    if (forth_university && forth_university.free_places > 0) {
      forth_university.accepted.push({
        UIN: student.UIN,
        score: student.forthScore,
      });
      forth_university.free_places -= 1;
      return;
    }
    if (forth_university && forth_university.free_places == 0) {
      let scores = [];
      forth_university.accepted.forEach((el) => scores.push(el.score));
      scores.sort((a, b) => b - a);
      let minScore = scores.pop();
  
      if (minScore < student.forthScore) {
        let sts = [];
        for (const line of forth_university.accepted) {
          if (line.score == minScore) {
            let indexRemove = forth_university.accepted.indexOf(line);
            //console.log(indexRemove);
            let st = studentsData.find((e) => e.UIN == line.UIN);
            sts.push(st);
            forth_university.accepted.splice(indexRemove, 1);
          }
        }
        forth_university.accepted.push({
          UIN: student.UIN,
          score: student.forthScore,
        });
        for (const st of sts) {
          addStudent(st);
        }
      }
    }
    filter = [];
    universitiesData.forEach((e) =>
      e.accepted.forEach((y) => filter.push(y.UIN == student.UIN))
    );
    if (student.fifthScore && student.fifthScore >= minScore && !filter.includes(true)) {
      fifth_university = universitiesData.find(
        (e) => e.course_id == student.course_id5
      );
    }
    if (fifth_university && fifth_university.free_places > 0) {
      fifth_university.accepted.push({
        UIN: student.UIN,
        score: student.fifthScore,
      });
      fifth_university.free_places -= 1;
      return;
    }
    if (fifth_university && fifth_university.free_places == 0) {
      let scores = [];
      fifth_university.accepted.forEach((el) => scores.push(el.score));
      scores.sort((a, b) => b - a);
      let minScore = scores.pop();
  
      if (minScore < student.fifthScore) {
        let sts = [];
        for (const line of fifth_university.accepted) {
          if (line.score == minScore) {
            let indexRemove = fifth_university.accepted.indexOf(line);
            //console.log(indexRemove);
            let st = studentsData.find((e) => e.UIN == line.UIN);
            fifth_university.accepted.splice(indexRemove, 1);
            sts.push(st);
          }
        }
        fifth_university.accepted.push({
          UIN: student.UIN,
          score: student.fifthScore,
        });
        for (const st of sts) {
          addStudent(st);
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
