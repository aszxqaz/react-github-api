import { Chip, Stack, Typography } from "@mui/material";
import { IconStar } from "../../../lib/components/icons";
import { Repository } from "../../../lib/github";
import { formatNumberWithSpaceDelim } from "../../../lib/utils";

interface RepositoryDetailsScreenProps {
  repository: Repository;
}

/**
 * Виджет деталей репозитория, отображающий основные характеристики
 * репозитория.
 */
export function RepositoryDetails({
  repository,
}: RepositoryDetailsScreenProps) {
  return (
    <Stack gap="1rem">
      <Typography variant="h4" gutterBottom>
        {repository.name}
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {repository.primaryLanguage ? (
          <Chip color="primary" label={repository.primaryLanguage.name} />
        ) : (
          <Typography fontStyle="italic">No primary language info</Typography>
        )}
        <Stack direction="row" alignItems="center" gap="0.5rem">
          <IconStar />
          <span>{formatNumberWithSpaceDelim(repository.stargazerCount)}</span>
        </Stack>
      </Stack>
      {repository.languages?.length && (
        <Stack direction="row" gap="0.5rem" flexWrap="wrap">
          {repository.languages?.map((lang) => (
            <Chip key={lang.id} label={lang.name} />
          ))}
        </Stack>
      )}
      {repository.license ? (
        <Typography>{repository.license}</Typography>
      ) : (
        <Typography fontStyle="italic">No license info</Typography>
      )}
    </Stack>
  );
}
