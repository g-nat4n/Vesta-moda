import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { storeProductPhoto } from "@/lib/cloudinary";
import { addProductImage } from "@/services/product.service";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const form = await request.formData();
  const files = form.getAll("file").filter((item): item is File => item instanceof File && item.size > 0);
  const productId = String(form.get("productId") ?? "");
  if (files.length === 0 || !productId) {
    return NextResponse.json({ message: "Arquivo e produto são obrigatórios" }, { status: 400 });
  }

  try {
    const images = [];
    for (const file of files) {
      const uploaded = await storeProductPhoto(file);
      images.push(await addProductImage(productId, uploaded.url, file.name, uploaded.publicId));
    }
    return NextResponse.json({ images, count: images.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha no envio da imagem.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
