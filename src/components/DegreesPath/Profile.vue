import React from 'react';
import { ReactComponent as LongArrow } from "../../svg/shortArrow.svg";

function Profile({ name, title, profilePicture, username, rating, position }) {
    const positionCSS = position === "right" ? 'right' : 'left';
    const arrowClass = position === "left" ? '-scale-x-100' : '';

    return (
        <>
            <div style={{ textAlign: positionCSS }} class='w-full relative'>
                            <div class='px-4 text-center inline-block relative'>
                                {/* remove explicit height when using real chess.com images */}
                                <img class="rounded-full m-auto border-white border-4" src={profilePicture} alt='user profile avatar' />
                                <h1 class='font-Outfit text-white tracking-wider text-lg lg:text-xl xl:text-2xl inline-block my-1'>
                                    {name}
                                </h1>
                                {
                                    title ?
            <div class='bg-[#b33430] rounded-[0.3rem] text-white text-xs lg:text-md xl:text-lg font-semibold mx-3 inline-block p-1'>
                <p class='m-0 p-0 flex justify-center align-center leading-none'>
                    {title}
                </p>
            </div> :
                            <></>
                    }
                    <h2 class='text-white font-Mono text-md lg:text-lg font-thin xl:text-2xl xl:m-2'>
                        {username}
                    </h2>

                    <h3 class='text-white font-Mono font-thin text-sm lg:text-md xl:text-lg'>
                        {rating}
                    </h3>
                </div>
            </div>
            <div class='relative w-full text-center scale-75'>
                <div class={arrowClass + " inline-block"}>
                    <LongArrow class='arrow-rotation' />
                </div>
            </div>
        </>
    );
}

export default Profile;