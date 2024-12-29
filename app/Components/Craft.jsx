import React from 'react';

const Craft = () => {
    return (
        <div className=" mx-auto  py-10 pt-0 pb-0 md:pt-10">
            <h2 className="text-center text-3xl md:text-4xl my-10 font-thin crimson green tracking-wider">CARFTS OF INDIA</h2>

            <div className="flex flex-wrap justify-center gap-6">
                {/* Video for web */}
                <video 
                    src="/images/video_web.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    className="hidden lg:block w-full lg:w-[100%] lg:h-[650px] object-cover"
                />

                {/* Video for mobile and smaller screens */}
                <video 
                    src="/images/video_mob.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    className="block lg:hidden w-full sm:w-[80%] h-[500px] object-cover"
                />
            </div>
        </div>
    );
};

export default Craft;
