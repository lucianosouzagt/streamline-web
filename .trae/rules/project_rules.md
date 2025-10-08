<?xml version="1.0" encoding="UTF-8"?>
<ProjectRules name="Streamline Frontend" stack="Next.js + React + TS" version="1.0">
  <!-- ============== META ============== -->
  <Settings>
    <DefaultAction>FAIL_BUILD</DefaultAction>
    <MinNodeVersion>20.0.0</MinNodeVersion>
    <Framework>Next.js 14+</Framework>
    <Language>TypeScript</Language>
    <PackageManager>pnpm</PackageManager>
  </Settings>

  <!-- ============== AMBIENTE ============== -->
  <Environment>
    <Rule id="ENV-001" name="EnvExampleExists">
      <Description>Deve existir .env.example versionado</Description>
      <Condition>file.exists('.env.example') == false</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Inclua .env.example no repo (sem segredos).</Message>
    </Rule>

    <Rule id="ENV-002" name="EnvLocalFromExample">
      <Description>.env.local deve existir (não versionado) e cobrir vars do example</Description>
      <Condition>file.exists('.env.local') == false OR env.diff('.env.example','.env.local').missingCount &gt; 0</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Crie .env.local baseado no .env.example antes de rodar o app.</Message>
    </Rule>

    <Rule id="ENV-003" name="RequiredVars">
      <Description>Variáveis obrigatórias</Description>
      <Condition>env.missing ANY_OF (NEXT_PUBLIC_API_URL, NEXT_PUBLIC_APP_NAME)</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Faltam variáveis: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_APP_NAME.</Message>
    </Rule>

    <Rule id="ENV-004" name="HttpsInProd">
      <Description>API deve ser HTTPS em produção</Description>
      <Condition>target.environment == 'production' AND env.NEXT_PUBLIC_API_URL NOT MATCHES ^https://</Condition>
      <Action>BLOCK_DEPLOY</Action>
      <Message>Em produção, use HTTPS em NEXT_PUBLIC_API_URL.</Message>
    </Rule>

  </Environment>

  <!-- ============== CONTROLE DE VERSÃO (GIT & GITHUB) ============== -->
  <VersionControl>
    <Rule id="GIT-001" name="SyncMainBeforeWork">
      <Description>Atualizar main antes de iniciar qualquer tarefa</Description>
      <Condition>task.start == true AND git.remote('origin/main').aheadOf('local/main') == true</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>git checkout main && git pull --rebase origin main.</Message>
    </Rule>

    <Rule id="GIT-002" name="BranchNaming">
      <Description>Uma branch por solicitação/alteração</Description>
      <Condition>branch.name NOT MATCHES ^(feature|bugfix|hotfix|chore|docs)/[a-z0-9._-]+$</Condition>
      <Action>REJECT</Action>
      <Message>Use feature/ | bugfix/ | hotfix/ | chore/ + slug.</Message>
    </Rule>

    <Rule id="GIT-003" name="AskBeforeCommit">
      <Description>Confirmação explícita antes de commitar</Description>
      <Condition>commit.ready == true AND user.confirm('Posso fazer o commit?') == false</Condition>
      <Action>PAUSE_PIPELINE</Action>
      <Message>Commit pausado até confirmação.</Message>
    </Rule>

    <Rule id="GIT-004" name="CommitMessageStandard">
      <Description>Padrão &lt;tag&gt;: &lt;short&gt; (inglês) + linha em branco + body</Description>
      <Condition>commit.header NOT MATCHES ^(feat|fix|style|refactor|test|build|ci|chore|docs|revert):\s[ -~]{5,80}$ OR (commit.bodyExists == true AND commit.raw NOT MATCHES ^.+\n\n.+$)</Condition>
      <Action>REJECT</Action>
      <Message>Ex: feat: add task board ↵↵Explain changes...</Message>
    </Rule>

    <Rule id="GIT-005" name="PRRequired">
      <Description>Push e PR para main obrigatórios após commit</Description>
      <Condition>commit.completed == true AND github.pr.opened == false</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Abra PR para main e associe à issue/tarefa.</Message>
    </Rule>

    <Rule id="GIT-006" name="NoDirectCommitsMain">
      <Description>Proibido commitar direto na main</Description>
      <Condition>branch.name == 'main' AND commit.attempt == true</Condition>
      <Action>REJECT</Action>
      <Message>Abra PR a partir de uma branch.</Message>
    </Rule>

    <Rule id="GIT-007" name="PRChecksApprovals">
      <Description>Checks verdes e 1+ aprovação antes do merge</Description>
      <Condition>github.pr.opened == true AND (ci.checks.passed == false OR approvals.count &lt; 1)</Condition>
      <Action>PAUSE_PIPELINE</Action>
      <Message>PR aguardando checks/approvação.</Message>
    </Rule>

    <Rule id="GIT-008" name="SquashMerge">
      <Description>Merge via Squash</Description>
      <Condition>github.pr.merged == true AND github.pr.mergeMethod != 'squash'</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Use Squash para manter histórico limpo.</Message>
    </Rule>

    <Rule id="GIT-009" name="PostMergeCleanup">
      <Description>Voltar para main e excluir branch ao finalizar</Description>
      <Condition>github.pr.merged == true AND (local.branch.exists == true OR remote.branch.exists == true)</Condition>
      <Action>WARN</Action>
      <Message>git checkout main && git pull --rebase && git branch -d &lt;branch&gt; && git push origin --delete &lt;branch&gt;</Message>
    </Rule>

    <Rule id="GIT-010" name="AskBeforeFinalize">
      <Description>Confirmar antes de excluir branch e finalizar</Description>
      <Condition>finalize.ready == true AND user.confirm('Posso finalizar, apagar a branch e voltar para main?') == false</Condition>
      <Action>PAUSE_PIPELINE</Action>
      <Message>Finalização pausada até confirmação.</Message>
    </Rule>

  </VersionControl>

  <!-- ============== QUALIDADE ============== -->
  <Quality>
    <Rule id="QL-001" name="ESLintClean">
      <Description>Sem erros de ESLint</Description>
      <Condition>eslint.errors &gt; 0</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Corrija erros do ESLint.</Message>
    </Rule>

    <Rule id="QL-002" name="PrettierFormatted">
      <Description>Código formatado com Prettier</Description>
      <Condition>prettier.formatted == false</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Execute pnpm format.</Message>
    </Rule>

    <Rule id="QL-003" name="TypeScriptStrict">
      <Description>Sem erros de tipagem</Description>
      <Condition>tsc.errors &gt; 0</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Corrija erros do TypeScript (modo strict).</Message>
    </Rule>

    <Rule id="QL-004" name="BuildWarnings">
      <Description>Build sem warnings críticos</Description>
      <Condition>build.warnings.critical &gt; 0</Condition>
      <Action>WARN</Action>
      <Message>Revise imports circulares/deprecated APIs.</Message>
    </Rule>

  </Quality>

  <!-- ============== FRONTEND (UX) ============== -->
  <Frontend>
    <Rule id="UI-001" name="DarkLightMode">
      <Description>Implementar tema claro/escuro</Description>
      <Condition>theme.toggleImplemented == false</Condition>
      <Action>WARN</Action>
      <Message>Adicione toggle de tema global.</Message>
    </Rule>

    <Rule id="UI-002" name="Responsive">
      <Description>Layout responsivo obrigatório</Description>
      <Condition>tests.responsive.pass == false</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Ajuste breakpoints e grids.</Message>
    </Rule>

    <Rule id="UI-003" name="LoadingErrorStates">
      <Description>Skeleton/spinner e tratativa de erro em todas as requisições</Description>
      <Condition>components.missingLoadingHandlers == true</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Adicione feedback de loading/erro.</Message>
    </Rule>

    <Rule id="UI-004" name="A11y">
      <Description>Acessibilidade sem violações críticas</Description>
      <Condition>accessibility.violations &gt; 0</Condition>
      <Action>WARN</Action>
      <Message>Corrija aria-labels, roles e contraste.</Message>
    </Rule>

  </Frontend>

  <!-- ============== INTEGRAÇÃO COM BACKEND ============== -->
  <Integration>
    <Rule id="API-001" name="AuthGuard">
      <Description>Rotas privadas exigem token</Description>
      <Condition>route.private == true AND auth.token.present == false</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Proteja rota com verificação de token.</Message>
    </Rule>

    <Rule id="API-002" name="AxiosInterceptor">
      <Description>Interceptor injeta token e trata 401</Description>
      <Condition>axios.interceptorConfigured == false</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Configure lib/api.ts com interceptors (auth + 401 → /login).</Message>
    </Rule>

  </Integration>

  <!-- ============== PIPELINE (CI/CD) ============== -->
  <Pipeline>
    <Rule id="CI-001" name="PreCommitHooks">
      <Description>Husky + lint-staged antes de commit</Description>
      <Condition>precommit.hooks.disabled == true</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Ative hooks para lint/type-check/test.</Message>
    </Rule>

    <Rule id="CI-002" name="TestsRequiredBeforeMerge">
      <Description>Testes devem passar para mergear</Description>
      <Condition>ci.tests.passed == false</Condition>
      <Action>FAIL_BUILD</Action>
      <Message>Falha nos testes. Corrija antes de merge.</Message>
    </Rule>

    <Rule id="CI-003" name="ManualApprovalProd">
      <Description>Deploy em produção com aprovação manual</Description>
      <Condition>target.environment == 'production' AND approvals.count &lt; 1</Condition>
      <Action>PAUSE_PIPELINE</Action>
      <Message>Produção exige aprovação.</Message>
    </Rule>

  </Pipeline>

  <!-- ============== SEGURANÇA ============== -->
  <Security>
    <Rule id="SEC-001" name="SecretScan">
      <Description>Bloquear segredos no diff</Description>
      <Condition>diff.content MATCHES (API_KEY|SECRET|TOKEN|PRIVATE_KEY|BEGIN RSA|APP_KEY=base64:)</Condition>
      <Action>REJECT</Action>
      <Message>Segredo detectado. Remova e use .env.local.</Message>
    </Rule>
  </Security>
</ProjectRules>
