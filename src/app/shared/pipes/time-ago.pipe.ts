import {ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform} from '@angular/core';
//
import {formatDistanceToNow, differenceInMinutes} from 'date-fns';

@Pipe({
    name: 'timeAgo',
    pure: false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
    private lastText: string = '';
    private lastTime: number = 0;
    private lastValue: Date;
    private currentTimer: number | null;

    constructor(private ngZone: NgZone,
                private cdRef: ChangeDetectorRef) {
    }

    transform(value: Date | string | number): string {
        const inputDate: Date = new Date(value);

        if (this.hasChanged(inputDate)) {
            this.lastTime = inputDate.getTime();
            this.lastValue = inputDate;
            //
            this.removeTimer();
            this.createTimer(inputDate);
            this.lastText = this.format(inputDate);
        } else {
            this.createTimer(inputDate);
        }

        return this.lastText;
    }

    ngOnDestroy(): void {
        this.removeTimer();
    }

    private format(date: Date): string {
        return formatDistanceToNow(new Date(date), {
            includeSeconds: true,
            addSuffix: true
        });
    }

    private hasChanged(value: Date): boolean {
        return value.getTime() !== this.lastTime;
    }

    private createTimer(inputDate: Date) {
        if (this.currentTimer) {
            return;
        }
        //
        const timeToUpdate = this.getSecondsUntilUpdate(inputDate) * 1000;

        this.currentTimer = this.ngZone.runOutsideAngular(() => {
            if (typeof window !== 'undefined') {
                return window.setTimeout(() => {
                    this.lastText = this.format(new Date(this.lastValue));

                    this.currentTimer = null;
                    this.ngZone.run(() => this.cdRef.markForCheck());
                }, timeToUpdate);
            } else {
                return null;
            }
        });
    }

    private removeTimer() {
        if (this.currentTimer) {
            window.clearTimeout(this.currentTimer);
            this.currentTimer = null;
        }
    }

    private getSecondsUntilUpdate(inputDate: Date) {
        const diffInMinutes: number = differenceInMinutes(new Date(), inputDate);
        const A_HOUR: number = 60; // 60 minutes

        if (diffInMinutes < 1) { // less than 1 min, update every 2 secs
            return 2;
        } else if (diffInMinutes < A_HOUR) { // less than an hour, update every 30 secs
            return 30;
        } else if (diffInMinutes < A_HOUR * 24) { // less than a day, update every 5 mins
            return 300;
        } else {  // update every hour
            return 3600;
        }
    }
}
