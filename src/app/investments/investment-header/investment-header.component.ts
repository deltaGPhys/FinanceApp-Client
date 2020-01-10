import { Component, OnInit, Input } from '@angular/core';
import { Investment } from 'src/app/models/Investment';
import { InvestmentService } from 'src/app/services/investment.service';
import { PortfolioValues } from 'src/app/models/portfolio-values';


@Component({
  selector: 'app-investment-header',
  templateUrl: './investment-header.component.html',
  styleUrls: ['./investment-header.component.css']
})
export class InvestmentHeaderComponent implements OnInit {

  @Input() account: Investment; 
  portfolioValues: PortfolioValues = this.investmentService.portValsChange.getValue();
  infoWindow: string;

  constructor(private investmentService: InvestmentService) { 
    this.investmentService.portValsChange.subscribe(value => {this.portfolioValues = value;console.log(value);});
    this.investmentService.infoWindow$.subscribe(value => this.infoWindow = value);
  }

  ngOnInit() {
    
  }

  toggleDisplay(view: string) {
    this.investmentService.toggleDisplay(view);
  }

  

}
