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

  findAverage(userInput){
    const districtNames = this.findByName(userInput)
    const districtKeyNames = Object.keys(districtNames.data)
    console.log(districtKeyNames);
    let districtAdd = 0;
    const DistrictAddition = districtKeyNames.forEach((currentDistricts)=>{
      return districtAdd = districtAdd + districtNames.data[currentDistricts]
    })
      let districtAddResult = districtAdd/districtKeyNames.length
      let districtAvg = parseFloat(districtAddResult.toFixed(3));
      return districtAvg
  }

compareDistrictAverages(district1, district2){
  const dist1 = this.findByName(district1)
  const dist2 = this.findByName(district2)

  const dist1Avg = this.findAverage(dist1.location)
  const dist2Avg = this.findAverage(dist2.location)
  const comparedAvg = (dist1Avg + dist2Avg)/2
  const fixedNum = parseFloat(comparedAvg.toFixed(3));

  console.log(dist1Avg, dist2Avg);
  return {
    [dist1.location]: dist1Avg,
    [dist2.location]: dist2Avg,
    "compared": fixedNum
  }
}


}
