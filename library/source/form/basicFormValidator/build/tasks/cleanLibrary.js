import del from 'del';

export const cleanLibrary = () => {
  return del(["./library/dist/*"])
}