export var fetchSchool = async (schoolName: string) => {
  try {
    var url = encodeURI(`/api/school?schoolName=${schoolName}`);
    var response = await fetch(url, {});
    var rawData = await response.json();

    if (rawData === null) return;
    var data = rawData.data;

    if (!("schoolInfo" in data)) return [];

    var schoolData = data["schoolInfo"][1]["row"];
    var schoolList: any[] = [];
    schoolData.forEach((school: any) => {
      schoolList.push({
        schoolName: school.SCHUL_NM,
        cityProvince: school.ATPT_OFCDC_SC_CODE,
        schoolCode: school.SD_SCHUL_CODE,
        schoolAddress: school.ORG_RDNMA,
      });
    });

    return schoolList;
  } catch (error) {
    console.error(error);
    return [];
  }
};
