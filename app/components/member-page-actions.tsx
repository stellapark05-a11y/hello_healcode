import Link from "next/link";

type MemberPageActionsProps = {
  canUploadPublic: boolean;
  currentPage: "dashboard" | "manager";
  isManager: boolean;
};

export function MemberPageActions({
  canUploadPublic,
  currentPage,
  isManager,
}: MemberPageActionsProps) {
  const secondaryClassName =
    "rounded-full border hairline px-5 py-3 text-sm font-semibold transition hover:bg-white";

  return (
    <nav aria-label="멤버 작업" className="flex flex-wrap gap-3">
      {currentPage === "manager" ? (
        <Link className={secondaryClassName} href="/dashboard">
          마이페이지
        </Link>
      ) : null}

      <Link
        aria-disabled={!canUploadPublic}
        className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
          canUploadPublic
            ? "bg-[#111827] text-white hover:bg-[#020617]"
            : "pointer-events-none border hairline text-[#7b8798]"
        }`}
        href="/projects/new"
        tabIndex={canUploadPublic ? undefined : -1}
      >
        공개 프로젝트 올리기
      </Link>

      {currentPage === "dashboard" && isManager ? (
        <Link className={secondaryClassName} href="/manager">
          매니저 콘솔
        </Link>
      ) : null}

      <form action="/api/auth/logout" method="post">
        <button className={secondaryClassName} type="submit">
          로그아웃
        </button>
      </form>
    </nav>
  );
}
