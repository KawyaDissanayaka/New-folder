import {
  AgentActionRequest,
  AgentActionResponse,
} from "../../shared/types/agent-action";

export const handler = async (
  event: AgentActionRequest,
): Promise<AgentActionResponse> => {
  console.log(
    `[Billing Gateway] Received action: ${event.action} for tenant: ${event.tenantId}`,
  );

  if (event.action === "check_balance") {
    // MOCK: Simulating a successful response from the existing SLT Billing API
    return {
      success: true,
      data: {
        accountNumber: "SLT-9982-555",
        balance: 1500.5,
        currency: "LKR",
        dueDate: "2026-09-15",
      },
    };
  }

  if (event.action === "pay_bill") {
    return {
      success: true,
      data: {
        transactionId: "TXN-" + Math.floor(10000000 + Math.random() * 90000000),
        amountPaid: "LKR 4,500.00",
        paymentStatus: "CONFIRMED",
        accountNumber: "SLT-9982-555",
        message: "Payment processed successfully.",
      },
    };
  }

  return {
    success: false,
    error: {
      code: "UNKNOWN_ACTION",
      message: `Action '${event.action}' is not supported by the billing gateway.`,
      retryable: false,
    },
  };
};
