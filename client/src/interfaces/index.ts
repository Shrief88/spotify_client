export interface UserInfo{
  country : string,
  display_name : string,
  followers:{
    total : number,
  },
  images: Array<Image>
}

interface Image {
  url : string,
  height : number,
  width : number
}