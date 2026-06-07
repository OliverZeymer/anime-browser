import { getLanguageFlagCode } from "@/utils/getLanguageFlagCode";
import { cn } from "@/libs/cn";

type Props = {
  language: string;
  className?: string;
};

export const LanguageFlag = ({ language, className }: Props) => {
  const code = getLanguageFlagCode(language);

  if (!code) {
    return null;
  }

  return (
    <span
      aria-hidden
      className={cn(
        "fi inline-block aspect-[4/3] w-[1.125rem] min-w-[1.125rem] shrink-0 rounded-[2px]",
        `fi-${code}`,
        className,
      )}
    />
  );
};
