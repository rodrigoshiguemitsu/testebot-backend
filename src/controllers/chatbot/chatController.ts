import { Request, Response } from "express";
import OpenAI from "openai";
import prismaClient from "../../prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function ChatbotHandler(req: Request, res: Response) {
  const { message } = req.body;
  
  try {
    const catalog = await prismaClient.catalog.findMany({ include: { category: true } });
  
    const saboresPizza = catalog
      .filter(item => item.category.name === "Pizzas Grandes")
      .map(item => `${item.name} (R$ ${item.price})`)
      .join('\n');
  
    const bebidasTexto = catalog
      .filter(item => item.category.name === "Bebidas")
      .map(item => `${item.name} (R$ ${item.price.toFixed(2).replace('.', ',')})`)
      .join('\n');

    const sobremesasTexto = catalog
      .filter(item => item.category.name === "Sobremesas")
      .map(item => `${item.name} (R$ ${item.price})`)
      .join('\n');

    const systemPrompt = `
      Você é "Tinic", um atendente virtual simpático de uma pizzaria.
      Siga este fluxo de atendimento sem nunca voltar para etapas anteriores:
      1. Apresente-se de forma amigável.
      2. Sugira educadamente a pizza "4 Queijos", a mais vendida da semana.
      3. Em seguida, envie a lista de pizzas disponíveis:${saboresPizza}
      4. Quando o cliente escolher as pizzas, pergunte se deseja uma bebida.
      5. Envie a lista de bebidas disponíveis:${bebidasTexto}
      ⚠️ IMPORTANTE: Depois que o cliente escolher as bebidas, **NUNCA** volte a perguntar sobre pizzas novamente.
      6. Após as bebidas, pergunte se deseja uma sobremesa e envie a lista:${sobremesasTexto}
      7. Depois que o cliente escolher (ou recusar) a sobremesa, finalize o pedido mostrando:
      - Itens escolhidos (pizzas, bebidas e sobremesas)
      - Valor total estimado
      - Mensagem de agradecimento simpática
      Regras:
      - Nunca invente sabores, bebidas ou sobremesas.
      - Não pule etapas e não volte atrás no atendimento.
      - Seja educado, direto e simpático, como um bom atendente humano seria.
      `;
  
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
      { role: "system", content: systemPrompt },
      ...message
      ]
    });
  
    const resposta = completion.choices[0].message?.content;
      res.json({ reply: resposta });
      
    } catch (error) {
      console.error("Erro no ChatbotHandler:", error);
      res.status(500).json({ error: "Erro ao processar o chatbot." });
    }
  }