import { Container, Typography } from "@mui/material";
import { Repository } from "../../../lib/github";
import { useRepoSelector } from "../../store";
import { RepositoryDetails as RepositoryDetailsWidget } from "../widgets";
import styles from "./RepositoryDetails.module.scss";

interface RepositoryDetailsProps {
  repoId: Repository["id"];
}

/**
 * Экран информации о выбранном репозитории, предполагающий расположение
 * в сайдбаре.
 */
export function RepositoryDetails({ repoId }: RepositoryDetailsProps) {
  const repository = useRepoSelector(repoId);

  return (
    <Container className={styles.container}>
      {repository ? (
        <RepositoryDetailsWidget repository={repository} />
      ) : (
        <Typography>Repository not found</Typography>
      )}
    </Container>
  );
}
