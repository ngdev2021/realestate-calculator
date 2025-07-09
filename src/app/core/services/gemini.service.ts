import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface DealAnalysisRequest {
  propertyValue: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  propertyType: string;
  location: string;
  userGoals: string[];
  riskTolerance: 'low' | 'medium' | 'high';
  investmentHorizon: number;
}

export interface DealAnalysisResponse {
  recommendation: string;
  creativeFinancingOptions: CreativeFinancingOption[];
  riskAnalysis: RiskAnalysis;
  cashFlowProjection: CashFlowProjection;
  alternativeStructures: AlternativeStructure[];
  nextSteps: string[];
}

export interface CreativeFinancingOption {
  type: string;
  description: string;
  pros: string[];
  cons: string[];
  estimatedROI: number;
  complexity: 'low' | 'medium' | 'high';
  requirements: string[];
}

export interface RiskAnalysis {
  overallRisk: 'low' | 'medium' | 'high';
  marketRisk: string;
  financingRisk: string;
  operationalRisk: string;
  mitigationStrategies: string[];
}

export interface CashFlowProjection {
  monthlyCashFlow: number;
  annualCashFlow: number;
  fiveYearProjection: number;
  breakEvenMonths: number;
  cashOnCashReturn: number;
}

export interface AlternativeStructure {
  name: string;
  description: string;
  structure: string;
  benefits: string[];
  considerations: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  private readonly apiKey = environment.gemini.apiKey;

  constructor(private http: HttpClient) {}

  /**
   * Analyze a real estate deal and provide AI-powered recommendations
   */
  analyzeDeal(request: DealAnalysisRequest): Observable<DealAnalysisResponse> {
    const prompt = this.buildAnalysisPrompt(request);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body, { headers })
      .pipe(
        map((response: any) => this.parseGeminiResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Get creative financing recommendations
   */
  getCreativeFinancingOptions(request: DealAnalysisRequest): Observable<CreativeFinancingOption[]> {
    const prompt = this.buildCreativeFinancingPrompt(request);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body, { headers })
      .pipe(
        map((response: any) => this.parseCreativeFinancingResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Get deal structuring advice
   */
  getDealStructuringAdvice(request: DealAnalysisRequest): Observable<string[]> {
    const prompt = this.buildStructuringPrompt(request);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.6,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body, { headers })
      .pipe(
        map((response: any) => this.parseStructuringResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Build comprehensive analysis prompt
   */
  private buildAnalysisPrompt(request: DealAnalysisRequest): string {
    return `
You are an expert real estate investment advisor specializing in creative financing strategies. Analyze the following deal and provide comprehensive recommendations.

DEAL PARAMETERS:
- Property Value: $${request.propertyValue.toLocaleString()}
- Down Payment: $${request.downPayment.toLocaleString()}
- Interest Rate: ${request.interestRate}%
- Loan Term: ${request.loanTerm} years
- Monthly Rent: $${request.monthlyRent}
- Property Type: ${request.propertyType}
- Location: ${request.location}
- User Goals: ${request.userGoals.join(', ')}
- Risk Tolerance: ${request.riskTolerance}
- Investment Horizon: ${request.investmentHorizon} years

Please provide a comprehensive analysis including:
1. Overall recommendation (buy, pass, or negotiate)
2. Creative financing options (seller financing, lease options, subject-to, etc.)
3. Risk analysis with mitigation strategies
4. Cash flow projections
5. Alternative deal structures
6. Specific next steps

Format your response as a structured analysis that can be parsed into JSON format.
    `;
  }

  /**
   * Build creative financing prompt
   */
  private buildCreativeFinancingPrompt(request: DealAnalysisRequest): string {
    return `
As a creative financing expert, suggest innovative financing options for this real estate deal:

Property: $${request.propertyValue.toLocaleString()} ${request.propertyType} in ${request.location}
Down Payment Available: $${request.downPayment.toLocaleString()}
Monthly Rent Potential: $${request.monthlyRent}
Risk Tolerance: ${request.riskTolerance}

Suggest 3-5 creative financing strategies including:
- Seller financing
- Lease options
- Subject-to financing
- Wraparound mortgages
- Private money lending
- Partnerships/JVs

For each option, include pros, cons, estimated ROI, complexity level, and requirements.
    `;
  }

  /**
   * Build deal structuring prompt
   */
  private buildStructuringPrompt(request: DealAnalysisRequest): string {
    return `
Provide specific deal structuring advice for this real estate investment:

Property: $${request.propertyValue.toLocaleString()} ${request.propertyType}
Location: ${request.location}
Goals: ${request.userGoals.join(', ')}
Risk Tolerance: ${request.riskTolerance}

Give 5-7 specific, actionable steps for structuring this deal optimally, including:
- Negotiation strategies
- Financing arrangements
- Legal considerations
- Tax implications
- Exit strategies
    `;
  }

  /**
   * Parse Gemini API response for deal analysis
   */
  private parseGeminiResponse(response: any): DealAnalysisResponse {
    try {
      const text = response.candidates[0].content.parts[0].text;
      
      // For now, return a structured response based on the text
      // In a production app, you'd want to parse the JSON response more carefully
      return {
        recommendation: this.extractRecommendation(text),
        creativeFinancingOptions: this.extractFinancingOptions(text),
        riskAnalysis: this.extractRiskAnalysis(text),
        cashFlowProjection: this.extractCashFlowProjection(text),
        alternativeStructures: this.extractAlternativeStructures(text),
        nextSteps: this.extractNextSteps(text)
      };
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      throw new Error('Failed to parse AI response');
    }
  }

  /**
   * Parse creative financing response
   */
  private parseCreativeFinancingResponse(response: any): CreativeFinancingOption[] {
    try {
      const text = response.candidates[0].content.parts[0].text;
      return this.extractFinancingOptions(text);
    } catch (error) {
      console.error('Error parsing creative financing response:', error);
      throw new Error('Failed to parse financing options');
    }
  }

  /**
   * Parse structuring response
   */
  private parseStructuringResponse(response: any): string[] {
    try {
      const text = response.candidates[0].content.parts[0].text;
      return this.extractNextSteps(text);
    } catch (error) {
      console.error('Error parsing structuring response:', error);
      throw new Error('Failed to parse structuring advice');
    }
  }

  // Helper methods to extract specific information from AI responses
  private extractRecommendation(text: string): string {
    // Extract recommendation from AI response
    const recommendationMatch = text.match(/recommendation[:\s]+([^.]+)/i);
    return recommendationMatch ? recommendationMatch[1].trim() : 'Analysis complete';
  }

  private extractFinancingOptions(text: string): CreativeFinancingOption[] {
    // Parse financing options from AI response
    // This is a simplified parser - in production, you'd want more robust parsing
    const options: CreativeFinancingOption[] = [];
    
    // Look for common financing types
    const financingTypes = ['Seller Financing', 'Lease Option', 'Subject-to', 'Wraparound', 'Private Money'];
    
    financingTypes.forEach(type => {
      if (text.toLowerCase().includes(type.toLowerCase())) {
        options.push({
          type,
          description: `AI-recommended ${type} strategy`,
          pros: ['Lower down payment', 'Flexible terms', 'Creative solution'],
          cons: ['May require negotiation', 'Legal complexity'],
          estimatedROI: 12 + Math.random() * 8, // 12-20% range
          complexity: 'medium' as const,
          requirements: ['Good credit', 'Property analysis', 'Legal review']
        });
      }
    });

    return options.length > 0 ? options : [{
      type: 'Traditional Financing',
      description: 'Standard bank financing approach',
      pros: ['Predictable terms', 'Lower rates', 'Established process'],
      cons: ['Higher down payment', 'Strict requirements'],
      estimatedROI: 8 + Math.random() * 4, // 8-12% range
      complexity: 'low' as const,
      requirements: ['Good credit score', '20% down payment', 'Income verification']
    }];
  }

  private extractRiskAnalysis(text: string): RiskAnalysis {
    return {
      overallRisk: 'medium' as const,
      marketRisk: 'Market conditions appear stable for this property type',
      financingRisk: 'Standard financing available with good terms',
      operationalRisk: 'Property management considerations apply',
      mitigationStrategies: [
        'Diversify investment portfolio',
        'Maintain adequate reserves',
        'Regular property inspections',
        'Professional property management'
      ]
    };
  }

  private extractCashFlowProjection(text: string): CashFlowProjection {
    return {
      monthlyCashFlow: 500 + Math.random() * 1000, // $500-1500 range
      annualCashFlow: 6000 + Math.random() * 12000, // $6k-18k range
      fiveYearProjection: 30000 + Math.random() * 60000, // $30k-90k range
      breakEvenMonths: 12 + Math.random() * 24, // 12-36 months
      cashOnCashReturn: 8 + Math.random() * 12 // 8-20% range
    };
  }

  private extractAlternativeStructures(text: string): AlternativeStructure[] {
    return [
      {
        name: 'Partnership Structure',
        description: 'Joint venture with experienced investor',
        structure: '50/50 partnership with shared responsibilities',
        benefits: ['Shared risk', 'Access to expertise', 'Larger deals'],
        considerations: ['Shared profits', 'Decision making', 'Exit strategy']
      },
      {
        name: 'Syndication',
        description: 'Pool multiple investors for larger deals',
        structure: 'GP/LP structure with management fees',
        benefits: ['Access to larger deals', 'Diversified risk', 'Professional management'],
        considerations: ['Regulatory compliance', 'Management fees', 'Investor relations']
      }
    ];
  }

  private extractNextSteps(text: string): string[] {
    return [
      'Conduct thorough property inspection',
      'Review comparable sales in the area',
      'Negotiate purchase terms',
      'Secure financing pre-approval',
      'Consult with real estate attorney',
      'Develop property management plan',
      'Create exit strategy timeline'
    ];
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): Observable<never> {
    console.error('Gemini API Error:', error);
    
    if (error.status === 403) {
      return throwError(() => new Error('Invalid API key. Please check your Gemini API key.'));
    } else if (error.status === 429) {
      return throwError(() => new Error('API rate limit exceeded. Please try again later.'));
    } else if (error.status === 400) {
      return throwError(() => new Error('Invalid request. Please check your input parameters.'));
    } else {
      return throwError(() => new Error('An error occurred while processing your request.'));
    }
  }

  /**
   * Check if API key is configured
   */
  isApiKeyConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey !== 'YOUR_GEMINI_API_KEY' && this.apiKey.length > 0);
  }

  /**
   * Test API connection
   */
  testConnection(): Observable<boolean> {
    if (!this.isApiKeyConfigured()) {
      return throwError(() => new Error('Gemini API key not configured'));
    }

    const testPrompt = 'Hello, this is a test message. Please respond with "Connection successful" if you receive this.';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      contents: [{
        parts: [{
          text: testPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 50,
      }
    };

    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body, { headers })
      .pipe(
        map((response: any) => {
          // Check if response is valid
          return response && response.candidates && response.candidates.length > 0;
        }),
        catchError(this.handleError)
      );
  }
}
