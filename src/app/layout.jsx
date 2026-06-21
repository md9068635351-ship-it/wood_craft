import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";

export const metadata={title:"Infinity Creations | Handcrafted Wooden Art",description:"Handcrafted wooden decor, furniture, kitchenware and personalised gifts by Infinity Creations in Moradabad.",icons:{icon:"/icon.jpg",apple:"/brand/infinity-creations-logo.jpeg"}};
export default function RootLayout({children}){return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`(function(){try{var t=localStorage.getItem('woodcraft-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`}}/></head><body className="antialiased"><SiteChrome>{children}</SiteChrome></body></html>}
