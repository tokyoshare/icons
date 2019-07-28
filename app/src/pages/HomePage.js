// import * as Layout from './layouts';

import { HeaderMenuLayout } from "pages/layouts"
import React, { useState } from "react";
import Categories from "components/Categories"
import Drawer from "components/Drawer";

const HomePage = (props)=>{
    const [state, setState] = useState({data:props.data});
    const handleSearch=(keyWord)=>{
        let categories = [...props.data.categories];
        let search = {
            icons:[],
            name: "search"
        }

        if(keyWord.length > 0){
            categories.forEach(category=>{
                category.icons.forEach(icon=>{
                    if(icon.id.includes(keyWord)){
                        search.icons.push({...icon});
                    }
                })
            })
            categories = [search, ...categories];
            setState({...state, data:{...props.data, categories}, isSearching:true});
        }else{
            setState({...state, data:{...props.data, categories}, isSearching:false});
        }
    }
    const handleStopSearch=()=>{
        setState({...state, isSearching:false});
    }
    const handleOpenDrawer=(status)=>{
        setState({...state, openDrawer:status})
    }
    const handleSelectType=(index)=>{
        setState({...state, iconType:index})
    }
    return(
        <HeaderMenuLayout 
            handleSearch={handleSearch} 
            handleStopSearch={handleStopSearch} 
            handleOpenDrawer={()=>handleOpenDrawer(true)}
            iconType={state.iconType}
        >
            <Drawer 
                onClose={()=>handleOpenDrawer(false)} 
                open={state.openDrawer} 
                onSelect={handleSelectType}
            />
            <div className="home-page">
                <Categories {...props} data={state.data} isSearching={state.isSearching} iconType={state.iconType}/>
            </div>
        </HeaderMenuLayout>
    )
}
export default HomePage;