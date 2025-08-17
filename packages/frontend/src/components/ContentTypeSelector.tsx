"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/hooks/useI18n";

interface ContentTypeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function ContentTypeSelector({ value, onValueChange }: ContentTypeSelectorProps) {
  const { t } = useI18n();

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-28 sm:w-32 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500">
        <SelectValue placeholder={t("common.contentType")} />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-600 text-white">
        <SelectItem value="all">{t("common.contentTypes.all")}</SelectItem>
        <SelectItem value="album">{t("common.contentTypes.album")}</SelectItem>
        <SelectItem value="artist">{t("common.contentTypes.artist")}</SelectItem>
        <SelectItem value="movie">{t("common.contentTypes.movie")}</SelectItem>
        <SelectItem value="music track">{t("common.contentTypes.musicTrack")}</SelectItem>
        <SelectItem value="podcast">{t("common.contentTypes.podcast")}</SelectItem>
        <SelectItem value="tvShow">{t("common.contentTypes.tvShow")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
