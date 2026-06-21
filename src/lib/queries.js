import { prisma } from "@/lib/prisma";

const productInclude={images:{orderBy:{order:"asc"}},videos:{orderBy:{order:"asc"}},category:true};
export async function getFeaturedProductsDb(){if(!prisma)return[];try{return await prisma.product.findMany({where:{isFeatured:true,isActive:true},include:productInclude,orderBy:{createdAt:"desc"},take:8})}catch{return[]}}
export async function getAllActiveProductsDb(){if(!prisma)return[];try{return await prisma.product.findMany({where:{isActive:true},include:productInclude,orderBy:{createdAt:"desc"}})}catch{return[]}}
export async function getProductBySlugDb(slug){if(!prisma)return null;try{return await prisma.product.findFirst({where:{slug,isActive:true},include:productInclude})}catch{return null}}
export async function getRelatedProductsDb(categorySlug,excludeId){if(!prisma)return[];try{const sameCategory=await prisma.product.findMany({where:{isActive:true,category:{slug:categorySlug},NOT:{id:excludeId}},include:productInclude,orderBy:[{isFeatured:"desc"},{createdAt:"desc"}],take:8});if(sameCategory.length>=8)return sameCategory;const used=[excludeId,...sameCategory.map(product=>product.id)];const more=await prisma.product.findMany({where:{isActive:true,id:{notIn:used}},include:productInclude,orderBy:[{isFeatured:"desc"},{createdAt:"desc"}],take:8-sameCategory.length});return[...sameCategory,...more]}catch{return[]}}
export async function getAllCategoriesDb(){if(!prisma)return[];try{return await prisma.category.findMany({where:{isActive:true},orderBy:[{sortOrder:"asc"},{name:"asc"}]})}catch{return[]}}
