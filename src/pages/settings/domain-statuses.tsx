export const verifyDomainStatus = {
  isPending(status?: string) {
    if (!status) return false;
    let s = status.toLowerCase();
    return s === "pending";
  },
  isSuccess(status?: string) {
    if (!status) return false;
    let s = status.toLowerCase();
    return s === "success";
  },
  isFailed(status?: string) {
    if (!status) return false;
    let s = status.toLowerCase();
    return s === "failed";
  },
  isTemporaryFailed(status?: string) {
    if (!status) return false;
    let s = status.toLowerCase();
    return s === "temporary_failure" || s === "temporaryfailure";
  },
  isNotStarted(status?: string) {
    if (!status) return false;
    let s = status.toLowerCase();
    return s === "notstarted" || s === "not_started";
  },
  isAlreadyExists(status?: string) {
    if (!status) return false;
    let s = status.toLowerCase();
    return s === "alreadyexist" || s === "already_exist";
  },
};
