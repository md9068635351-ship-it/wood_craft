import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
export default function NewProductPage() {
    return (<div className="mx-auto max-w-2xl">
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-walnut">
        <ArrowLeft size={15}/> Back to products
      </Link>
      <h1 className="font-display text-2xl font-semibold text-walnut">
        Add New Product
      </h1>
      <p className="mt-1 text-sm text-ink/60">
        Fill in the details below. You can edit this anytime.
      </p>

      <div className="mt-6">
        <ProductForm />
      </div>
    </div>);
}
