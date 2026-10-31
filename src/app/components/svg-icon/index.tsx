type SVGIconProps = {
  icon: string;
};

export function SVGIcon({ icon }: SVGIconProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: icon,
      }}
    />
  );
}
