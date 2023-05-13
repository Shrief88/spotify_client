import { format} from 'date-fns';

export const capitalize = (str : string) : string => {
  const arr = str.split(" ");
  for(let i=0 ; i< arr.length ; i++){
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
}

export const formatTime  = (timsInMs : number) : string => {
  const timeInSeconds = timsInMs / 1000;
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return format(new Date(0, 0, 0, 0, minutes, seconds), 'm:ss');

} 



