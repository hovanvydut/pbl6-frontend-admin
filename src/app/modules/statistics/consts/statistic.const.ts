import { StatisticKey } from './../enums';

export const StatisticTypes = [
    {
        key: StatisticKey.CreatePost,
        name: 'Số bài viết được đăng',
        yaxis: 'Số bài viết',
    },
    {
        key: StatisticKey.UptopPost,
        name: 'Số bài viết được đẩy ưu tiên',
        yaxis: 'Số bài viết',
    },
    {
        key: StatisticKey.Revenue,
        name: 'Doanh thu',
        yaxis: 'Doanh thu (VNĐ)',
    },
]