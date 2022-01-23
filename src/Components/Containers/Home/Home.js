import React, {Suspense} from 'react';
import {Route, Navigate, Routes} from 'react-router-dom';
import {CircularProgress} from '@material-ui/core'
import HomePanels from './HomePanels/HomePanels';
import Logo from '../../Logo/Logo';

const Itemlist = React.lazy(() => import('./Itemlist/Itemlist'));
const LogIn = React.lazy(() => import('../../Login/Login'));
let spinner = <CircularProgress style={{color: "#EFE486", position: "absolute", top: "20px"}}/>;

export default function Home() {
        return (
            <div>
                <Suspense fallback={<div>{spinner}</div>}>
                    <Routes>
                        <Route path="/home" element={<Logo/>}/>
                    </Routes>
                    <Routes>
                        <Route path="/login" exact element={<LogIn/>}/>
                        <Route path="/:itemCat" exact element={<Itemlist/>}/>
                        <Route exact path="/home" element={<HomePanels/>}/>
                        <Route exact path="/" element={<Navigate to="/home"/>}/>
                    </Routes>
                </Suspense>
            </div>
        )
}