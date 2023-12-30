import { School } from './YourSchoolType'; // Import your School type

export interface RegionData {
  totalSchools: number;
  totalStaffs: number;
  totalStudents: number;
  schools: School[];
}

export const categorizeByRegion = (data: School[]) => {
  const regionData: Record<string, RegionData> = {};

  data.forEach((item) => {
    const { region, boys, girls, numberOfStaffs } = item;
    const parsedBoys = parseInt(boys, 10);
    const parsedGirls = parseInt(girls, 10);
    const parsedNumberOfStaffs = parseInt(numberOfStaffs, 10);

    if (!regionData[region]) {
      // Initialize regionData only if the region is encountered for the first time
      regionData[region] = { totalStudents: 0, totalStaffs: 0, totalSchools: 0, schools: [] };
    }

    // Increment counts only if the region is encountered for the first time
    if (!regionData[region].schools.includes(item)) {
      regionData[region].totalStudents += parsedBoys + parsedGirls;
      regionData[region].totalStaffs += parsedNumberOfStaffs;
      regionData[region].totalSchools++;
      regionData[region].schools.push(item);
    }
  });

  // Convert totalStaffs and totalStudents to numbers
  Object.values(regionData).forEach((region) => {
    region.totalStaffs = Number(region.totalStaffs);
    region.totalStudents = Number(region.totalStudents);
    region.totalSchools = Number(region.totalSchools);
  });

  return regionData;
};
