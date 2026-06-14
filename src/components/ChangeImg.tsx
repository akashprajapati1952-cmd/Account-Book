import { connect, type ConnectedProps } from "react-redux";
import { uploadImg } from "../reducers/userSlice";
import { useState } from "react";

const ChangeImg=({hide,uploadImg}:{hide: ()=>void} & Redux_props)=>{
    const [file, setFile]=useState<File | undefined>(undefined)

    function handleBack(){
        hide()
    }
    function handleSave(){
        uploadImg({file: file!, message:"Uploading Image please wait.."})
        hide()
    }
   return (
    <div className="flex flex-col gap-2 items-center rounded-lg w-60 bg-amber-300 px-5 py-3 fixed top-[calc(50%-130px)] left-[calc(50%-120px)]">
        
        <img src={file ? URL.createObjectURL(file): "/face.png"} alt='Selected Image' className="w-28 h-28 rounded-full object-cover border"/>
        <label htmlFor="img" className="bg-white w-full px-2 py-1 text-sm rounded-md border">Select Image</label>
        <input className="hidden" id="img" type="file" onChange={(e)=>{
            const myfile=(e.target.files?.[0])
            if(!myfile)return
            setFile(myfile)
        }}/>
        <div className="w-full flex flex-col gap-1">
          <button type="button" className=' text-white disabled:bg-red-400 px-4 py-1 text-sm rounded bg-red-900 w-full' disabled={!file} onClick={handleSave}>Save Image</button>
          <button type="button" className=' text-white px-4 py-1 text-sm rounded bg-red-900 w-full' onClick={handleBack}>Back</button>
        </div>
    </div>
   )
}
const mapDispatchToProps={
    uploadImg
}

const connectedComp=connect(undefined,mapDispatchToProps)
type Redux_props= ConnectedProps<typeof connectedComp>
export default connectedComp(ChangeImg);