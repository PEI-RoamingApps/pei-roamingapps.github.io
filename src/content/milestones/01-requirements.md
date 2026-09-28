---
number: 1
title: Requirements & Planning
status: in-progress
summary: Estudo dos referenciais IPCEI-CIS e GSMA EWBI, definição do âmbito do MVP e desenho da arquitetura preliminar da federação.
deliverables:
  - title: Levantamento de requisitos e casos de uso
    status: In Progress
  - title: Estado da arte (IPCEI-CIS, GSMA Operator Platform, ETSI)
    status: In Progress
  - title: Especificação preliminar da interface East-West (EWBI)
    status: In Progress
  - title: Microsite do projeto configurado
    status: Done
  - title: Apresentação da Milestone 1
    status: In Progress
start: 2026-09-21
end: 2026-10-15
---
# Objetivo

**Construir um protótipo funcional de plataformas de operadores federadas e cooperantes capazes de transferir a execução de uma aplicação (*hand-over*) de forma automática e transparente para o utilizador.**

## Contexto

Para garantir baixa latência e elevada taxa de resposta, muitas aplicações têm de correr fisicamente próximas do utilizador final (*edge computing*). Em vez de cada fornecedor negociar individualmente com todos os operadores de telecomunicações, as plataformas dos operadores devem cooperar entre si para transferir a responsabilidade de executar a aplicação de forma transparente.

Este projeto apoia-se na iniciativa europeia **IPCEI-CIS** (*Important Project of Common European Interest on Next Generation Cloud Infrastructure and Services*) e na especificação **GSMA Operator Platform** (especificamente o modelo OPG.02).

## Problema

- **Complexidade de negociação bilateral:** As empresas enfrentam custos incomportáveis se tiverem de integrar com dezenas de redes de operadores locais.
- **Ausência de interoperabilidade nativa:** Plataformas de *cloud/edge* proprietárias operam frequentemente em silos isolados.
- **Garantia de proximidade geográfica:** Necessidade de manter a execução do software no operador mais próximo do utilizador em movimento sem interrupção de serviço.

## Resultados Esperados

- **Plataformas de Operadores em Kubernetes:** Instâncias independentes a simular diferentes operadores de telecomunicações.
- **Federation Manager:** Componente central em cada operador responsável pelo *onboarding*, descoberta de parceiros e decisão de *hand-over*.
- **Interface East-West (EWBI):** Implementação e documentação (via OpenAPI/Swagger) das mensagens trocadas entre operadores com base na especificação da GSMA.
- **Demonstração End-to-End:** Pedido de colocação de aplicação submetido num operador A e instanciado com sucesso num operador B.

## Atores do Sistema

- **Consumer / Application Developer:** Regista a aplicação junto do seu operador de origem com restrições de localização e latência.
- **Home Operator Platform:** Plataforma local que recebe o pedido inicial através do *Provider Access Point*.
- **Partner Operator Platform:** Plataforma parceira federada que acolhe a aplicação quando o operador de origem não tem recursos ou cobertura na localização pretendida.

## Arquitetura de Alto Nível

A solução segue os componentes fundamentais do modelo ICRA e GSMA:

1. **Provider Access Point:** Ponto de entrada para desenvolvedores registarem e parametrizarem os requisitos de colocação da aplicação.
2. **Federation Manager:** Módulo de lógica que avalia recursos locais e gere a comunicação inter-operador via interface EWBI.
3. **Federation Catalogue:** Registo público de serviços e capacidades disponibilizadas por operadores parceiros.
4. **East-West Bound Interface (EWBI):** Canal de comunicação seguro entre Federation Managers para negociação de recursos e acionamento de *hand-overs*.