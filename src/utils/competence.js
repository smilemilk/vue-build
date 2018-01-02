import { jsCookie } from '@/utils/auth';

function competence(code) {
  const rolesList = jsCookie.getJson('rolesButton');
  if (!code) return false;

  if (rolesList.indexOf(code.toString()) === 0) {
    return true;
  } else {
    return false;
  }
}
export default competence;
