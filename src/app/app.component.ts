import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {DOCUMENT} from "@angular/common";
import teams from "../assets/teams.json";

export interface DialogData {
  newTeamName: String;
  teams: any;
  selectedTeam: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public dialog: MatDialog
  ) {
  }

  selectedTeam;

  ngOnInit(): void {
    this.selectedTeam = teams[0];
    let elem = this.document;
    elem.body.onkeydown = (event) => {
      if (event.key == 'ArrowLeft') {
        this.increaseHomeScore();
      } else if (event.key == 'ArrowRight') {
        this.increaseAwayScore();
      } else if (event.key == 'ArrowUp') {
        this.decreaseHomeScore();
      } else if (event.key == 'ArrowDown') {
        this.decreaseAwayScore();
      }
    }
  }


  title = 'dc-scoreboard';
  homescore = 0;
  guestscore = 0;

  formattedHomeScore = this.homescore.toLocaleString('en-US', {
    minimumIntegerDigits: 2
  });

  formattedAwayScore = this.guestscore.toLocaleString('en-US', {
    minimumIntegerDigits: 2
  });

  isSingleClick: Boolean = true;

  increaseHomeScore = () => {
    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick) {
        this.homescore += 1;
        this.formattedHomeScore = this.homescore.toLocaleString('en-US', {
          minimumIntegerDigits: 2
        });
      }
    }, 250)
  };

  decreaseHomeScore = () => {
    this.isSingleClick = false;
    this.homescore -= 1;
    this.formattedHomeScore = this.homescore.toLocaleString('en-US', {
      minimumIntegerDigits: 2
    });
  };

  increaseAwayScore = () => {
    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick) {
        this.guestscore += 1;
        this.formattedAwayScore = this.guestscore.toLocaleString('en-US', {
          minimumIntegerDigits: 2
        });
      }
    }, 250)
  };

  decreaseAwayScore = () => {
    this.isSingleClick = false;
    this.guestscore -= 1;
    this.formattedAwayScore = this.guestscore.toLocaleString('en-US', {
      minimumIntegerDigits: 2
    });
  };

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      selectedTeam: this.selectedTeam,
      teams: teams
    };
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result.name != 'Neu'){
        this.selectedTeam = result;
      }else {
        this.selectedTeam.name = result.newName;
        this.selectedTeam.imageurl = result.imageurl;
      }

    });
  }
}

@Component({
  selector: 'changeGuestTeam',
  templateUrl: 'app.changeGuestTeam.html',
})
export class DialogAnimationsExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient
  ) {
  }
}
