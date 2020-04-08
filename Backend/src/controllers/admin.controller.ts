import { User, Report } from '../models';
import HttpErrors from 'http-errors';
import { Role } from '../const';
import { Types } from 'mongoose';

export default class AdminController {
    static async getAllUsers(req: any, res: any): Promise<void> {
        const users = await User.find({}).select('-password');
        res.json(users);
    }

    static async toggleBlacklist(req: any, res: any): Promise<void> {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        user.blacklist = !user.blacklist;
        user.save();
        res.json({ blacklist: user.blacklist });
    }

    static async getAllReports(req: any, res: any): Promise<void> {
        const reports = await Report.find({});
        res.json(reports);
    }

    static async createReport(req: any, res: any): Promise<any> {
        const reporteeId = await User.findById(req.body.userId);
        if (!reporteeId) {
            throw new HttpErrors.BadRequest();
        }
        const report = new Report({
            reporter: req.user._id,
            reportee: reporteeId,
            reason: req.body.reason,
            createTime: new Date(),
        });
        await report.save();
        res.json({ status: 'success' });
    }
    static async deleteReport(req: any, res: any): Promise<any> {
        if (req.user.role != Role.ADMIN) {
            throw new HttpErrors.BadRequest();
        }
        if (!(await Report.exists({ _id: req.params.reportId }))) {
            throw new HttpErrors.BadRequest();
        }
        await Report.findByIdAndDelete(req.params.reportId);
        res.json({ status: 'success' });
    }
}
