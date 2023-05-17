import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']  
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined

  constructor(private memberService: MembersService, 
    private toastr: ToastrService,
    private translateService: TranslateService,
    public presenceService: PresenceService) { }

  ngOnInit(): void {
  }
  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toastr.success(this.translateService.instant('MsgLiked') +' ' + member.knownAs)
    })
  }
}
