const CLOUDINARY_HOST = "res.cloudinary.com";

export function optimizeCloudinary(url, { width, height, crop = "fill" } = {}) {
  if (!url || !url.includes(CLOUDINARY_HOST) || !url.includes("/upload/")) {
    return url;
  }

  if (/\/upload\/(?:[^/]+,)*f_auto/.test(url)) {
    return url;
  }

  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`);
  if (height) {
    transforms.push(`h_${height}`);
    transforms.push(`c_${crop}`);
  }

  return url.replace("/upload/", `/upload/${transforms.join(",")}/`);
}
