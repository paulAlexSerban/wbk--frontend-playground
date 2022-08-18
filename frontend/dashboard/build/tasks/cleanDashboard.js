import del from 'del';

export const cleanDashboard = () => {
  return del(["./dashboard/dist/*"])
}