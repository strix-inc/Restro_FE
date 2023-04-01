import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Rough = () => {

    var x = 4 + "4";
    console.log(x)

    return (
        <>
            <div>
            </div>
            <div className={`flex flex-col w-[80%] ml-[20%]`}>
                <div className='mt-[4rem] m-2'>
                    <h1>spinner</h1>
                    <>
                        <div class="flex space-x-2">
                            <div aria-label="Loading..." role="status">
                                <svg class="h-6 w-6 animate-spin stroke-indigo-500" viewBox="0 0 256 256">
                                    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                    <line
                                        x1="195.9"
                                        y1="60.1"
                                        x2="173.3"
                                        y2="82.7"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="24"></line>
                                    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                    <line
                                        x1="195.9"
                                        y1="195.9"
                                        x2="173.3"
                                        y2="173.3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="24"></line>
                                    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                    <line
                                        x1="60.1"
                                        y1="195.9"
                                        x2="82.7"
                                        y2="173.3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="24"></line>
                                    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                    <line
                                        x1="60.1"
                                        y1="60.1"
                                        x2="82.7"
                                        y2="82.7"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="24"></line>
                                </svg>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default Rough
