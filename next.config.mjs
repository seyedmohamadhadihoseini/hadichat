/** @type {import('next').NextConfig} */

const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:"localhost"
            },{
                hostname:"chat.zilab.ru"
            }
        ]
    },
    experimental:{
        serverActions:{
            allowedOrigins:["chat.zilab.ru","*chat.zilab.ru"],
            bodySizeLimit:"5MB"
        },
        
    },
    allowedDevOrigins:["chat.zilab.ru","*chat.zilab.ru"]
};

export default nextConfig;
