/** @type {import('next').NextConfig} */
const nextConfig = {
    //Permitir que imagens que venham do servidor possam ser exibidas
    images: {
        remotePatterns: [
            {
                hostname: "utfs.io",
            },
        ],
    },
};

export default nextConfig;
