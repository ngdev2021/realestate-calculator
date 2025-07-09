import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService, DealAnalysisRequest } from '../../core/services/gemini.service';

@Component({
  selector: 'app-gemini-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gemini-test.component.html',
  styleUrl: './gemini-test.component.scss'
})
export class GeminiTestComponent implements OnInit {
  apiKeyConfigured = false;
  connectionStatus = '';
  isLoading = false;
  testResult = '';
  errorMessage = '';

  // Sample deal data for testing
  sampleDeal: DealAnalysisRequest = {
    propertyValue: 250000,
    downPayment: 50000,
    interestRate: 6.5,
    loanTerm: 30,
    monthlyRent: 2200,
    propertyType: 'Single Family Home',
    location: 'Austin, TX',
    userGoals: ['Cash Flow', 'Appreciation', 'Tax Benefits'],
    riskTolerance: 'medium',
    investmentHorizon: 5
  };

  constructor(private geminiService: GeminiService) {}

  ngOnInit(): void {
    this.checkApiKeyConfiguration();
  }

  checkApiKeyConfiguration(): void {
    this.apiKeyConfigured = this.geminiService.isApiKeyConfigured();
    if (!this.apiKeyConfigured) {
      this.errorMessage = 'Gemini API key not configured. Please add your API key to the environment files.';
    }
  }

  testConnection(): void {
    if (!this.apiKeyConfigured) {
      this.errorMessage = 'Please configure your Gemini API key first.';
      return;
    }

    this.isLoading = true;
    this.connectionStatus = 'Testing connection...';
    this.errorMessage = '';

    this.geminiService.testConnection().subscribe({
      next: (result) => {
        this.isLoading = false;
        this.connectionStatus = '✅ Connection successful!';
        this.testResult = 'API is working correctly.';
      },
      error: (error) => {
        this.isLoading = false;
        this.connectionStatus = '❌ Connection failed';
        this.errorMessage = error.message;
      }
    });
  }

  testDealAnalysis(): void {
    if (!this.apiKeyConfigured) {
      this.errorMessage = 'Please configure your Gemini API key first.';
      return;
    }

    this.isLoading = true;
    this.connectionStatus = 'Analyzing deal...';
    this.errorMessage = '';

    this.geminiService.analyzeDeal(this.sampleDeal).subscribe({
      next: (analysis) => {
        this.isLoading = false;
        this.connectionStatus = '✅ Deal analysis complete!';
        this.testResult = `Recommendation: ${analysis.recommendation}\n\nCreative Financing Options: ${analysis.creativeFinancingOptions.length} options found\n\nNext Steps: ${analysis.nextSteps.length} steps provided`;
      },
      error: (error) => {
        this.isLoading = false;
        this.connectionStatus = '❌ Analysis failed';
        this.errorMessage = error.message;
      }
    });
  }

  testCreativeFinancing(): void {
    if (!this.apiKeyConfigured) {
      this.errorMessage = 'Please configure your Gemini API key first.';
      return;
    }

    this.isLoading = true;
    this.connectionStatus = 'Getting financing options...';
    this.errorMessage = '';

    this.geminiService.getCreativeFinancingOptions(this.sampleDeal).subscribe({
      next: (options) => {
        this.isLoading = false;
        this.connectionStatus = '✅ Financing options retrieved!';
        this.testResult = `Found ${options.length} creative financing options:\n\n${options.map(opt => `• ${opt.type}: ${opt.description}`).join('\n')}`;
      },
      error: (error) => {
        this.isLoading = false;
        this.connectionStatus = '❌ Failed to get financing options';
        this.errorMessage = error.message;
      }
    });
  }
}
