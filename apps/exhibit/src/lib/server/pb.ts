import { makePBAdmin } from '@repo/lib/pb';
import ENVs from '$env/static/private';

const pb = await makePBAdmin(ENVs);

export { pb };
