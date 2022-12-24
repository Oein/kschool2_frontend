export const fetchSchool = async (schoolName: string) => {
  try {
    const url = encodeURI(`/api/school?schoolName=${schoolName}`);
    const response = await fetch(url, {});
    console.log(response);
    const rawData = await response.json();

    console.log(rawData);

    if (rawData === null) return;
    const data = rawData.data;

    if (!("schoolInfo" in data)) return [];

    const schoolData = data["schoolInfo"][1]["row"];
    let schoolList: any[] = [];
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
