export default class DistrictRepository {
  constructor(data) {
    this.schoolDistrictInfo = this.schoolStatus(data);
  }

  schoolStatus(data) {
    const cleanStudents = data.reduce((studentNumbers, eachSchool) => {
      let schoolData = eachSchool.Data;

      if (!isNaN(schoolData)) {
        schoolData = parseFloat(schoolData.toFixed(3));
      } else if (isNaN(schoolData)) {
        schoolData = 0;
      }
      if (!studentNumbers[eachSchool.Location]) {
        studentNumbers[eachSchool.Location] = {};
        studentNumbers[
          eachSchool.Location
        ].location = eachSchool.Location.toUpperCase();
        studentNumbers[eachSchool.Location].data = {};
      }
      studentNumbers[eachSchool.Location].data[
        eachSchool.TimeFrame
      ] = schoolData;
      return studentNumbers;
    }, {});
    return cleanStudents;
  }

  findByName(userInput = "") {
    if (userInput === "") {
      return undefined;
    }
    const bigUserInput = userInput.toUpperCase();
    let schoolKeys = Object.keys(this.schoolDistrictInfo);
    const schoolDistrictLocation = schoolKeys.find(schoolDistrict => {
      if (bigUserInput === this.schoolDistrictInfo[schoolDistrict].location) {
        return this.schoolDistrictInfo[schoolDistrict].location;
      }
    });
    return this.schoolDistrictInfo[schoolDistrictLocation];
  }
  findAllMatches(userInput = ''){
    const newUserInput = userInput.toUpperCase()
    const districtKeys = Object.keys(this.schoolDistrictInfo)
    const schoolDistrictArray = districtKeys.reduce((schoolArray, schoolDistrict)=>{
      if(!schoolArray[this.schoolDistrictInfo[schoolDistrict]]){
        schoolArray.push(this.schoolDistrictInfo[schoolDistrict])
      }
    return schoolArray
    }, [])

  if(userInput === ''){
    return schoolDistrictArray
  }
    const matchedDistricts = schoolDistrictArray.reduce((schoolSearch, districts)=>{
      if (districts.location === newUserInput){
        schoolSearch.push(districts)
      }
      return schoolSearch
    }, [])
    return matchedDistricts
  }
}
