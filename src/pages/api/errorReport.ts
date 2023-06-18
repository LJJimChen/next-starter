import type { NextApiRequest, NextApiResponse } from 'next';

type ErrorInfo = {
    name: string;
};

export default function errorReport(
    req: NextApiRequest,
    res: NextApiResponse<ErrorInfo>
) {
    res.status(200).json({ name: 'Example' });
    setTimeout(() => 1, 1000);
}
