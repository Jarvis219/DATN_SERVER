import Staffs from '../models/staffModel';
import WorkdayHistory from '../models/workdayHistoryModel';

async function listStaff() {
  const staffsId = [];
  const data = await Staffs.find();
  data.forEach((element) => {
    staffsId.push(element._id);
  });
  return staffsId;
}

export const handleUpdateWorkdayHistory = async () => {
  const dataId = await listStaff();
  dataId.forEach(async (element) => {
    const data = new WorkdayHistory({
      staff_id: element,
    });
    await data.save((err, data) => {
      if (err) {
        return err;
      }
      return 'ok';
    });
  });
};
