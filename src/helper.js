export default class DistrictRepository {
  constructor(data) {
    this.schoolDistrictInfo = this.schoolStatus(data);
  }

  schoolStatus(data) {
    // year & data as key val pairs
    const cleanStudents = data.reduce((studentNumbers, eachSchool) => {
      // if (!studentNumbers[eachSchool.Location]) {
      //   studentNumbers[eachSchool.Location] = {
      //     location: eachSchool.Location.toUpperCase(),
      //     TimeFrame: eachSchool.TimeFrame,
      //     Data: eachSchool.Data
      //   };

      let schoolData = eachSchool.Data

      if(!isNaN(schoolData)){
        schoolData = parseFloat(schoolData.toFixed(3))
      } else if (isNaN(schoolData)){
        schoolData = 0
        console.log(schoolData);
      }
        if(!studentNumbers[eachSchool.Location]){
          studentNumbers[eachSchool.Location] = {}
          studentNumbers[eachSchool.Location].location = eachSchool.Location.toUpperCase()
          studentNumbers[eachSchool.Location].data = {}
        }
        studentNumbers[eachSchool.Location].data[eachSchool.TimeFrame] = schoolData
        return studentNumbers;
    }, {});
    // console.log(cleanStudents)
    return cleanStudents;
  }

  findByName(userInput = '') {
    // returns an object
    // object has individual district info
    // 1. take objects key values and convert to an array
    // 2. run find() on array values
    // 3. when they match return matched object
    if(userInput === ''){
      return undefined
    }
    const bigUserInput = userInput.toUpperCase();
    let schoolKeys = Object.keys(this.schoolDistrictInfo);
    // console.log(this.schoolDistrictInfo);
    const schoolDistrictLocation = schoolKeys.find(schoolDistrict => {
      if (bigUserInput === this.schoolDistrictInfo[schoolDistrict].location) {
        return this.schoolDistrictInfo[schoolDistrict].location;
      }
    });
    return this.schoolDistrictInfo[schoolDistrictLocation];
  }
}
