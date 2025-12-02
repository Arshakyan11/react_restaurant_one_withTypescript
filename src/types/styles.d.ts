declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "aos";
declare module "*.png";
declare module "*.webp";
declare module "*.jpg";
declare module "*.avif";
declare module "*.jpeg";
