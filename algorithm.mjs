import { universitiesData } from "./uniData.mjs";
import { studentsData } from "./studentsData.mjs";
import {appendFileSync} from 'fs';


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
 
let filter = []
universitiesData.forEach((e) =>
e.accepted.forEach(y=>filter.push(y.UIN==student.UIN)));
  if (first_university.free_places > 0 && student.firstScore >= 9&& !filter.includes(true))
 {
    first_university.free_places -= 1;

    first_university.accepted.push({
      UIN: student.UIN,
      score: student.firstScore,
    });
    return;
  }
  filter = []
universitiesData.forEach((e) =>
e.accepted.forEach(y=>filter.push(y.UIN==student.UIN)));
    if (first_university.free_places == 0  && !filter.includes(true)) {
    let scores = [];
    first_university.accepted.forEach((el) => scores.push(el.score));
    scores.sort((a, b) => b - a);
    let minScore = scores.pop();

    if (minScore < student.firstScore) {

      let sts =[]
      
      for (const line of first_university.accepted) {
      if(line.score == minScore){
        let indexRemove = first_university.accepted.indexOf(line)
        //console.log(indexRemove);
        let st = studentsData.find(
          (e) => e.UIN == line.UIN
        );
        first_university.accepted.splice(indexRemove,1)
        sts.push(st)
        
      }
    }
    
    first_university.accepted.push({
      UIN: student.UIN,
      score: student.firstScore,
    });
    for (const st of sts) {
      
      addStudent(st)
    }

      
    }
    
    filter = []
universitiesData.forEach((e) =>
e.accepted.forEach(y=>filter.push(y.UIN==student.UIN)));
    
    if(student.firstScore == minScore &&!filter.includes(true)) {
     
      first_university.accepted.push({
        UIN: student.UIN,
        score: student.firstScore,
      });
    
  }
}
  filter = []
universitiesData.forEach((e) =>
e.accepted.forEach(y=>filter.push(y.UIN==student.UIN)));
  if (
    student.secondScore &&
    student.secondScore >= 9 &&
    !filter.includes(true)
  ) {
    second_university = universitiesData.find(
      (e) => e.course_id == student.course_id2
    );
  }
  filter = []
  universitiesData.forEach((e) =>
  e.accepted.forEach(y=>filter.push(y.UIN==student.UIN)));
  if (second_university && second_university.free_places > 0 && !filter.includes(true)) {
    second_university.accepted.push({
      UIN: student.UIN,
      score: student.secondScore,
    });
    second_university.free_places -= 1;
    return;
  } 
  filter = []
  universitiesData.forEach((e) =>
  e.accepted.forEach(y=>filter.push(y.UIN==student.UIN)));
  if (second_university && second_university.free_places == 0 
) {
    let scores = [];
    second_university.accepted.forEach((el) => scores.push(el.score));
    scores.sort((a, b) => b - a);
    let minScore = scores.pop();

    if (minScore < student.secondScore) {
      let sts = []
      for (const line of second_university.accepted) {
        if(line.score == minScore){
          let indexRemove = second_university.accepted.indexOf(line)
         // console.log(indexRemove);
          let st = studentsData.find(
            (e) => e.UIN == line.UIN
          );
          sts.push(st)
    second_university.accepted.splice(indexRemove,1)
    
  }
}


second_university.accepted.push({
  UIN: student.UIN,
  score: student.secondScore,
});
for (const st of sts) {
  
  addStudent(st)
}

    
    }
    
  }
  filter = []
  universitiesData.forEach((e) =>
  e.accepted.forEach(y=>filter.push(y.UIN==student.UIN)));
  if (
    student.thirdScore &&
    student.thirdScore >= 9 &&
    !filter.includes(true)
    )
   {
    third_university = universitiesData.find(
      (e) => e.course_id == student.course_id3
    );
  }
  if (
    third_university &&
    Number(third_university.free_places) > 0 
   
  ) {
    third_university.accepted.push({
      UIN: student.UIN,
      score: student.thirdScore,
    });
    third_university.free_places -= 1;
    return;
  }
  if (
    third_university &&
    third_university.free_places == 0
    
  ) {
    let scores = [];
    third_university.accepted.forEach((el) => scores.push(el.score));
    scores.sort((a, b) => b - a);
    let minScore = scores.pop();

    if (minScore < student.thirdScore) {
      let sts = []
      for (const line of third_university.accepted) {
        if(line.score == minScore){
          let indexRemove = third_university.accepted.indexOf(line)
         // console.log(indexRemove);
          let st = studentsData.find(
            (e) => e.UIN == line.UIN
          );
          sts.push(st)
          third_university.accepted.splice(indexRemove,1)
          
        }
      }
      
      
      third_university.accepted.push({
        UIN: student.UIN,
        score: student.thirdScore,
      });
      for (const st of sts) {
  
        addStudent(st)
      }
      
      
    }
    
  }
  filter = []
  universitiesData.forEach((e) =>
  e.accepted.forEach(y=>filter.push(y.UIN==student.UIN)));
  if (
    student.forthScore &&
    student.forthScore >= 9 &&
    !filter.includes(true)
  ) {
    forth_university = universitiesData.find(
      (e) => e.course_id == student.course_id4
    );
  }
  if (
    forth_university &&
    forth_university.free_places > 0
  ) {
    forth_university.accepted.push({
      UIN: student.UIN,
      score: student.forthScore,
    });
    forth_university.free_places -= 1;
    return;
  }
  if (
    forth_university &&
    forth_university.free_places == 0 
  
  ) {
    let scores = [];
    forth_university.accepted.forEach((el) => scores.push(el.score));
    scores.sort((a, b) => b - a);
    let minScore = scores.pop();

    if (minScore < student.forthScore) {
      let sts = []
      for (const line of forth_university.accepted) {
        if(line.score == minScore){
          let indexRemove = forth_university.accepted.indexOf(line)
          //console.log(indexRemove);
          let st = studentsData.find(
            (e) => e.UIN == line.UIN
          );
          sts.push(st)
          forth_university.accepted.splice(indexRemove,1)
          
        }
      }
      forth_university.accepted.push({
        UIN: student.UIN,
        score: student.forthScore,
      });
      for (const st of sts) {
  
        addStudent(st)
      }
      
   
    }
    
  }
  filter = []
  universitiesData.forEach((e) =>
  e.accepted.forEach(y=>filter.push(y.UIN==student.UIN)));
  if (
    student.fifthScore &&
    student.fifthScore >= 9 && !filter.includes(true)
  ) {
    fifth_university = universitiesData.find(
      (e) => e.course_id == student.course_id5
    );
  }
  if (
    fifth_university &&
    fifth_university.free_places > 0 
   
  ) {
    fifth_university.accepted.push({
      UIN: student.UIN,
      score: student.fifthScore,
    });
    fifth_university.free_places -= 1;
    return;
  }
  if (
    fifth_university &&
    fifth_university.free_places == 0 
    
  ) {
    let scores = [];
    fifth_university.accepted.forEach((el) => scores.push(el.score));
    scores.sort((a, b) => b - a);
    let minScore = scores.pop();

    if (minScore < student.fifthScore) {
      let sts = []
      for (const line of fifth_university.accepted) {
        if(line.score == minScore){
          let indexRemove = fifth_university.accepted.indexOf(line)
          //console.log(indexRemove);
          let st = studentsData.find(
            (e) => e.UIN == line.UIN
          );
          fifth_university.accepted.splice(indexRemove,1)
          sts.push(st)
        }
      }
      fifth_university.accepted.push({
        UIN: student.UIN,
        score: student.fifthScore,
      });
      for (const st of sts) {
  
        addStudent(st)
      }
      
    }
  }
}
let firstRow = 'course_id, speciality, university, university_id, announced_places, free_places, UIN\n'
appendFileSync('result.csv',firstRow)
universitiesData.forEach(uni => uni.accepted.sort((a,b)=>b.score-a.score))
 universitiesData.forEach(uni =>uni.accepted.forEach(st=>appendFileSync('result.csv', `${uni.course_id}, ${uni.speciality}, ${uni.university}, ${uni.university_id}, ${uni.free_places+uni.accepted.length}, ${uni.free_places}, ${st.UIN}, ${st.score}\n`)));
universitiesData.forEach(uni=>console.log(uni));

